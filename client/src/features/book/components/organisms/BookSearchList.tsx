import React, { useEffect, useRef } from 'react';
import { styled } from 'styled-components';

import { IBookDetail } from '@features/book/types/bookData';

import useSearchBook from '@features/book/hooks/useSearchBook';

import withAsyncBoundary from '@components/organisms/withAsyncBoundary';
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

const PaginationObserver = styled.li`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 50px;
`;

interface IBookSearchListProps {
	closeModal: () => void;
	searchTerm?: string;
}

function BookSearchList({
	closeModal,
	searchTerm,
}: IBookSearchListProps): JSX.Element {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useSearchBook(searchTerm, { maxResults: 5, startPage: 1 });
	const observerTargetRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
					fetchNextPage();
				}
			},
			{ threshold: 0.5 },
		);

		if (observerTargetRef.current) {
			observer.observe(observerTargetRef.current);
		}

		return () => observer.disconnect();
	}, [fetchNextPage, hasNextPage, isFetchingNextPage]);

	return (
		<Container>
			{data?.pages.map(page => (
				<React.Fragment key={page[0].isbn}>
					{page.map((book: IBookDetail) => (
						<BookSearchItem
							key={book.isbn}
							cover={book.cover}
							title={book.title}
							author={book.author}
							publisher={book.publisher}
							pubDate={book.pubDate}
							isbn={book.isbn}
							closeModal={closeModal}
						/>
					))}
				</React.Fragment>
			))}
			{hasNextPage && (
				<PaginationObserver ref={observerTargetRef}>
					{isFetchingNextPage && <Loader />}
				</PaginationObserver>
			)}
		</Container>
	);
}

export default withAsyncBoundary(BookSearchList, {
	SuspenseFallback: null,
});
