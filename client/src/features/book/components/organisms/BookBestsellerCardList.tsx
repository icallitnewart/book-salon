import React from 'react';
import styled from 'styled-components';

import EmptyAlert from '@components/molecules/EmptyAlert';
import BookBestsellerCardItem from '../molecules/BookBestsellerCardItem';

import useBestsellerList from '../../hooks/useBestsellerList';

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
	const { data: books } = useBestsellerList();

	if (!books || books.length === 0) {
		return (
			<Container>
				<EmptyAlert />
			</Container>
		);
	}

	return (
		<Container>
			{books.slice(0, 7).map((book: IBestSellerBook) => {
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
