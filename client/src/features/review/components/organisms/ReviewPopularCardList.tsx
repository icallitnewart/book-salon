import React from 'react';
import styled from 'styled-components';

import { SortTypes } from '@config/query/queryKeys';
import useReviewList from '@features/review/hooks/useReviewList';

import ReviewPopularCardItem from '../molecules/ReviewPopularCardItem';

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 30px;
	width: 100%;
`;

function ReviewPopularCardList(): JSX.Element {
	const { data: reviews, isPending } = useReviewList(
		{
			sort: { type: SortTypes.MOST_VIEWED },
			pagination: { perPage: 6, pageGroupSize: 1 },
		},
		{
			select: data => data.reviews,
		},
	);

	// TODO: Skeleton UI로 대체
	if (isPending || !reviews) {
		return <p>Loading...</p>;
	}

	return (
		<Container>
			{reviews.length > 0 &&
				reviews.map(review => (
					<ReviewPopularCardItem key={review.id} review={review} />
				))}
		</Container>
	);
}

export default ReviewPopularCardList;
