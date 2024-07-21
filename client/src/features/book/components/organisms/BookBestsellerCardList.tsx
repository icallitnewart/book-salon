import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import BookBestsellerCardItem from '../molecules/BookBestsellerCardItem';

const Container = styled.section`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

interface IBestSellerBook {
	title: string;
	author: string;
	cover: string;
	isbn13: number;
}

function BookBestsellerCardList(): JSX.Element {
	const [bestsellerCardList, setBestsellerCardList] = useState<
		IBestSellerBook[]
	>([]);

	// 테스트용
	const testFetch = async () => {
		const response = await axios.get(
			'http://localhost:5000/api/books/bestseller',
		);
		const { books } = response.data;
		setBestsellerCardList(books.slice(0, 7));
	};

	useEffect(() => {
		testFetch();
	}, []);

	return (
		<Container>
			{bestsellerCardList.map(book => {
				return (
					<BookBestsellerCardItem
						key={book.isbn13}
						title={book.title}
						author={book.author}
						cover={book.cover}
						link={`/book/${book.isbn13}/detail`}
					/>
				);
			})}
		</Container>
	);
}

export default BookBestsellerCardList;
