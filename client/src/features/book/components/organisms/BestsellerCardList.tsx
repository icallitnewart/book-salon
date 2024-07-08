import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import BestsellerCardItem from '../molecules/BestsellerCardItem';

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

function BestsellerCardList(): JSX.Element {
	const [bestsellerCardList, setBestsellerCardList] = useState<
		IBestSellerBook[]
	>([]);

	// 테스트용
	const testFetch = async () => {
		const response = await axios.get(
			'http://localhost:5000/api/books/test/bestseller',
		);
		const { item } = response.data.data;
		console.log(item);
		setBestsellerCardList(item.slice(0, 6));
	};

	useEffect(() => {
		testFetch();
	}, []);

	return (
		<Container>
			{bestsellerCardList.map(book => {
				return (
					<BestsellerCardItem
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

export default BestsellerCardList;
