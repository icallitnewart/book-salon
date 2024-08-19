import React from 'react';

import { SortTypes } from '@config/query/queryKeys';

import useReviewListInfinite from '@features/review/hooks/useReviewListInfinite';

import withAsyncBoundary from '@components/organisms/withAsyncBoundary';
import ReviewCardList from './ReviewCardList';

function ReviewPopularCardList() {
	const { reviews } = useReviewListInfinite({
		sort: { type: SortTypes.MOST_VIEWED },
		pagination: { page: 1, perPage: 6, pageGroupSize: 1 },
		isInfiniteEnabled: false,
	});

	return <ReviewCardList reviews={reviews} />;
}

export default withAsyncBoundary(ReviewPopularCardList, {
	SuspenseFallback: <ReviewCardList.Skeleton />,
});
