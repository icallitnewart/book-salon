import React from 'react';

import { SortTypes } from '@config/query/queryKeys';
import withAsyncBoundary from '@components/organisms/withAsyncBoundary';
import ReviewCardList from './ReviewCardList';

import useReviewList from '../../hooks/useReviewList';

function ReviewPopularCardList() {
	const { data: reviews, isPending } = useReviewList(
		{
			sort: { type: SortTypes.MOST_VIEWED },
			pagination: { page: 1, perPage: 6 },
		},
		{
			select: data => data.reviews,
		},
	);
	// TODO: Skeleton UI로 대체
	if (isPending || !reviews) {
		return <p>Loading...</p>;
	}

	return <ReviewCardList reviews={reviews} />;
}

export default withAsyncBoundary(ReviewPopularCardList, {
	SuspenseFallback: null,
});
