import React, { Suspense, useEffect, useRef } from 'react';
import { styled } from 'styled-components';

import { IReviewDetail } from '@features/review/types/reviewData';

import useSearchReview from '@features/review/hooks/useSearchReview';

import withAsyncBoundary from '@components/organisms/withAsyncBoundary';
import Loader from '@components/molecules/Loader';
import ReviewSearchItem from '../molecules/ReviewSearchItem';

const Container = styled.ul`
	width: 100%;
	height: calc(100% - 30px);
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

interface IReviewSearchListProps {
	closeModal: () => void;
	searchTerm?: string;
}

function ReviewSearchList({
	closeModal,
	searchTerm,
}: IReviewSearchListProps): JSX.Element {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useSearchReview(searchTerm, { perPage: 5 });
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
				<React.Fragment key={page.pageInfo.lastPage}>
					{page.reviews.map((review: IReviewDetail) => (
						<ReviewSearchItem
							key={review.id}
							id={review.id}
							title={review.title}
							content={review.content}
							user={review.user}
							createdAt={review.createdAt}
							viewCount={review.viewCount}
							book={review.book}
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

export default withAsyncBoundary(ReviewSearchList, {
	SuspenseFallback: null,
});
