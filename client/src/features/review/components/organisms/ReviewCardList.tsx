import React, { useMemo } from 'react';
import styled from 'styled-components';
import { nanoid } from 'nanoid';

import { IReviewDetail } from '@features/review/types/reviewData';

import useInfiniteScroll from '@hooks/useInfiniteScroll';

import Loader from '@components/molecules/Loader';
import EmptyAlert from '@components/molecules/EmptyAlert';
import withPaginationObserver from '@components/organisms/withPaginationObserver';
import ReviewCardItem from '../molecules/ReviewCardItem';

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 30px;
	width: 100%;
`;

const ObserverContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 50px;
`;

interface IReviewCardListProps {
	reviews: IReviewDetail[];
	fetchNextPage?: () => void;
	hasNextPage?: boolean;
	isFetchingNextPage?: boolean;
}

function ReviewCardList({
	reviews,
	fetchNextPage,
	hasNextPage,
	isFetchingNextPage,
}: IReviewCardListProps): JSX.Element {
	const observerRef = useInfiniteScroll({
		hasNextPage: !!hasNextPage,
		isFetchingNextPage: !!isFetchingNextPage,
		fetchNextPage: fetchNextPage || (() => {}),
		isEnabled: !!fetchNextPage,
	});

	const PaginationObserver = useMemo(() => {
		if (!fetchNextPage) return React.memo(() => null);

		return withPaginationObserver({
			Component: ObserverContainer,
			observerRef,
			isFetchingNextPage: !!isFetchingNextPage,
			loader: <ReviewCardList.Skeleton />,
		});
	}, [fetchNextPage, isFetchingNextPage, observerRef]);

	if (reviews.length === 0) {
		return (
			<Container>
				<EmptyAlert />
			</Container>
		);
	}

	return (
		<Container>
			{reviews.map(review => (
				<ReviewCardItem key={review.id} review={review} />
			))}
			{fetchNextPage && hasNextPage && <PaginationObserver />}
		</Container>
	);
}

ReviewCardList.Skeleton = function (): JSX.Element {
	return (
		<Container>
			{Array.from({ length: 6 }).map(_ => (
				<ReviewCardItem.Skeleton key={nanoid()} />
			))}
		</Container>
	);
};

export default ReviewCardList;
