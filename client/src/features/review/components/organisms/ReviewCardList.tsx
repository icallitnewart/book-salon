import React from 'react';
import { styled } from 'styled-components';

import { IReviewDetail } from '@features/review/types/reviewData';

import withAsyncBoundary from '@components/organisms/withAsyncBoundary';
import EmptyAlert from '@components/molecules/EmptyAlert';
import ReviewCardItem from '../molecules/ReviewCardItem';

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: 20px;
	width: 100%;
	min-height: 300px;
`;

interface IReviewCardListProps {
	reviews?: IReviewDetail[];
	isPending: boolean;
}

function ReviewCardList({
	reviews,
	isPending,
}: IReviewCardListProps): JSX.Element {
	// TODO: Skeleton UI로 대체
	if (isPending || !reviews) {
		return <p>Loading...</p>;
	}

	return (
		<Container>
			{reviews.length > 0 ? (
				reviews.map(review => (
					<ReviewCardItem
						key={review.id}
						id={review.id}
						user={review.user}
						title={review.title}
						content={review.content}
						createdAt={review.createdAt}
						viewCount={review.viewCount}
					/>
				))
			) : (
				<EmptyAlert />
			)}
		</Container>
	);
}

export default withAsyncBoundary(ReviewCardList, {
	SuspenseFallback: null,
});
