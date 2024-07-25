import React from 'react';
import styled from 'styled-components';

import withAsyncBoundary from '@components/organisms/withAsyncBoundary';
import EmptyAlert from '@components/molecules/EmptyAlert';
import { ROUTES } from '@constants/routes';
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
	isbn13: string;
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
						link={ROUTES.BOOK.DETAIL(book.isbn13)}
					/>
				);
			})}
		</Container>
	);
}

export default withAsyncBoundary(BookBestsellerCardList);
