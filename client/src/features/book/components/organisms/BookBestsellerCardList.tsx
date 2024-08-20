import React from 'react';
import styled from 'styled-components';
import { nanoid } from 'nanoid';

import { ROUTES } from '@constants/routes';

import withAsyncBoundary from '@components/organisms/withAsyncBoundary';
import EmptyAlert from '@components/molecules/EmptyAlert';
import BookCardItem from '../molecules/BookCardItem';

import useBestsellerList from '../../hooks/useBestsellerList';

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: 310px;
`;

interface IBestSellerBook {
	title: string;
	author: string;
	cover: string;
	isbn: string;
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
					<BookCardItem
						key={book.isbn}
						title={book.title}
						author={book.author}
						cover={book.cover}
						link={ROUTES.BOOK.DETAIL(book.isbn)}
					/>
				);
			})}
		</Container>
	);
}

BookBestsellerCardList.Skeleton = function () {
	return (
		<Container>
			{Array.from({ length: 7 }).map(_ => (
				<BookCardItem.Skeleton key={nanoid()} />
			))}
		</Container>
	);
};

export default withAsyncBoundary(BookBestsellerCardList, {
	SuspenseFallback: <BookBestsellerCardList.Skeleton />,
});
