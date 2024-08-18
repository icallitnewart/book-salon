import React from 'react';
import { styled } from 'styled-components';
import { nanoid } from 'nanoid';

import { ROUTES } from '@constants/routes';

import useInfiniteScroll from '@hooks/useInfiniteScroll';
import useCalculatePerPage from '@hooks/useCalculatedPerPage';
import useLikedBookList from '@features/book/hooks/useLikedBookList';

import withAsyncBoundary from '@components/organisms/withAsyncBoundary';
import withPaginationObserver from '@components/organisms/withPaginationObserver';
import BookCardItem from '../molecules/BookCardItem';

const Container = styled.div`
	display: flex;
	gap: 20px 50px;
	flex-wrap: wrap;
	width: 100%;
	padding: 20px;
`;

const ObserverContainer = styled.li`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 50px;
`;

const ITEMS_PER_ROW = 5;

function BookLikeCardList(): JSX.Element {
	const perPage = useCalculatePerPage({
		itemHeight: 310,
		itemsPerRow: ITEMS_PER_ROW,
	});
	const { books, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useLikedBookList({ pagination: { perPage } });

	const observerRef = useInfiniteScroll({
		hasNextPage: !!hasNextPage,
		isFetchingNextPage: !!isFetchingNextPage,
		fetchNextPage,
		isEnabled: !!fetchNextPage,
	});

	const PaginationObserver = withPaginationObserver({
		Component: ObserverContainer,
		observerRef,
		isFetchingNextPage,
		loader: <BookLikeCardList.Skeleton />,
	});

	return (
		<Container>
			{books &&
				books.map(book => (
					<BookCardItem
						key={book.isbn}
						title={book.title}
						author={book.author}
						cover={book.cover}
						link={ROUTES.BOOK.DETAIL(book.isbn)}
					/>
				))}
			{hasNextPage && <PaginationObserver />}
		</Container>
	);
}

BookLikeCardList.Skeleton = function () {
	return (
		<Container>
			{Array.from({ length: ITEMS_PER_ROW * 2 }).map(_ => (
				<BookCardItem.Skeleton key={nanoid()} />
			))}
		</Container>
	);
};

export default withAsyncBoundary(BookLikeCardList, {
	SuspenseFallback: <BookLikeCardList.Skeleton />,
});
