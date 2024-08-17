import React, { useMemo } from 'react';
import { styled } from 'styled-components';

import { IBookDetail } from '@features/book/types/bookData';

import useInfiniteScroll from '@hooks/useInfiniteScroll';
import useSearchBook from '@features/book/hooks/useSearchBook';

import withAsyncBoundary from '@components/organisms/withAsyncBoundary';
import withPaginationObserver from '@components/organisms/withPaginationObserver';
import Loader from '@components/molecules/Loader';
import BookSearchItem from '../molecules/BookSearchItem';

const Container = styled.ul`
	width: 100%;
	flex: 1;
	overflow-y: auto;

	&::-webkit-scrollbar {
		width: 9px;
	}

	&::-webkit-scrollbar-track {
		background: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background-color: #ddd;
		border-radius: 20px;
		border: 4px solid transparent;
		border-left: 2px;
		background-clip: content-box;
	}
`;

const ObserverContainer = styled.li`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 50px;
`;

interface IBookSearchListProps {
	closeModal: () => void;
	searchTerm: string;
}

function BookSearchList({
	closeModal,
	searchTerm,
}: IBookSearchListProps): JSX.Element {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useSearchBook(searchTerm, { maxResults: 5, startPage: 1 });
	const observerRef = useInfiniteScroll({
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	});
	const books = useMemo(() => {
		return data?.pages.flatMap(page => page) || [];
	}, [data]);

	const PaginationObserver = withPaginationObserver({
		Component: ObserverContainer,
		observerRef,
		isFetchingNextPage,
		loader: <Loader />,
	});

	return (
		<Container>
			{books.map((book: IBookDetail) => (
				<BookSearchItem
					key={book.isbn}
					cover={book.cover}
					title={book.title}
					author={book.author}
					publisher={book.publisher}
					pubDate={book.pubDate}
					isbn={book.isbn}
					searchTerm={searchTerm}
					closeModal={closeModal}
				/>
			))}
			{hasNextPage && <PaginationObserver />}
		</Container>
	);
}

export default withAsyncBoundary(BookSearchList, {
	SuspenseFallback: null,
});
