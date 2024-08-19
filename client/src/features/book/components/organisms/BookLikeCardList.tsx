import React from 'react';
import { styled } from 'styled-components';
import { nanoid } from 'nanoid';

import { ROUTES } from '@constants/routes';

import useInfiniteScroll from '@hooks/useInfiniteScroll';
import useCalculatePerPage from '@hooks/useCalculatedPerPage';
import useLikedBookList from '@features/book/hooks/useLikedBookList';

import { Paragraph } from '@typographies';
import { ReactComponent as BookSvg } from '@assets/svg/book.svg';
import withAsyncBoundary from '@components/organisms/withAsyncBoundary';
import withPaginationObserver from '@components/organisms/withPaginationObserver';
import BookCardItem from '../molecules/BookCardItem';

const Container = styled.div`
	display: flex;
	gap: 20px 50px;
	flex-wrap: wrap;
	width: 100%;
	min-height: 300px;
	padding: 20px;
`;

const ObserverContainer = styled.div`
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

	if (!books || books.length === 0) {
		return <BookLikeCardList.EmptyAlert />;
	}

	return (
		<Container>
			{books.map(book => (
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

const CentredWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex: 1;
`;

const BookIcon = styled(BookSvg)`
	width: 50px;
	height: 50px;
	color: #bbb;
	margin-bottom: 10px;
`;

BookLikeCardList.EmptyAlert = function (): JSX.Element {
	return (
		<Container>
			<CentredWrapper>
				<BookIcon />
				<Paragraph variant="article-subtitle-sm" $color="#aaa">
					좋아요한 도서가 없습니다.
				</Paragraph>
			</CentredWrapper>
		</Container>
	);
};

BookLikeCardList.Skeleton = function (): JSX.Element {
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
