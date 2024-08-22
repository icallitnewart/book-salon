import React, { useMemo } from 'react';
import { styled } from 'styled-components';

import { IReviewDetail } from '@features/review/types/reviewData';

import useInfiniteScroll from '@hooks/useInfiniteScroll';
import useSearchReview from '@features/review/hooks/useSearchReview';

import withAsyncBoundary from '@components/organisms/withAsyncBoundary';
import withPaginationObserver from '@components/organisms/withPaginationObserver';
import Loader from '@components/molecules/Loader';
import SearchEmptyAlert from '@components/molecules/SearchEmptyAlert';
import ReviewSearchItem from '../molecules/ReviewSearchItem';

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

interface IReviewSearchListProps {
	closeModal: () => void;
	searchTerm: string;
}

function ReviewSearchList({
	closeModal,
	searchTerm,
}: IReviewSearchListProps): JSX.Element {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
		useSearchReview(searchTerm, { perPage: 5 });
	const observerRef = useInfiniteScroll({
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	});
	const reviews = useMemo(() => {
		return data?.pages.flatMap(page => page.reviews) || [];
	}, [data]);

	const PaginationObserver = withPaginationObserver({
		Component: ObserverContainer,
		observerRef,
		isFetchingNextPage,
		loader: <Loader />,
	});

	if (!isPending && reviews.length === 0) {
		return <SearchEmptyAlert searchTerm={searchTerm} />;
	}

	return (
		<Container>
			{reviews.map((review: IReviewDetail) => (
				<ReviewSearchItem
					key={review.id}
					id={review.id}
					title={review.title}
					content={review.content}
					user={review.user}
					createdAt={review.createdAt}
					viewCount={review.viewCount}
					rating={review.rating}
					tags={review.tags}
					book={review.book}
					searchTerm={searchTerm}
					closeModal={closeModal}
				/>
			))}
			{hasNextPage && <PaginationObserver />}
		</Container>
	);
}

export default withAsyncBoundary(ReviewSearchList, {
	SuspenseFallback: null,
});
