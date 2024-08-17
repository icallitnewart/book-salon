import React from 'react';

import { SortTypes } from '@config/query/queryKeys';

import useReviewListInfinite from '@features/review/hooks/useReviewListInfinite';

import withAsyncBoundary from '@components/organisms/withAsyncBoundary';
import ReviewCardList from './ReviewCardList';

function ReviewPopularCardList() {
	const { reviews, isPending } = useReviewListInfinite({
		sort: { type: SortTypes.MOST_VIEWED },
		pagination: { page: 1, perPage: 6, pageGroupSize: 1 },
		isInfiniteEnabled: false,
	});

	// TODO: Skeleton UI로 대체
	if (isPending || !reviews) {
		return <p>Loading...</p>;
	}

	return <ReviewCardList reviews={reviews} />;
}

export default withAsyncBoundary(ReviewPopularCardList, {
	SuspenseFallback: null,
});
