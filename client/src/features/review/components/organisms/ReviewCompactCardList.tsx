import React from 'react';
import { styled } from 'styled-components';
import { nanoid } from 'nanoid';

import { IReviewDetail } from '@features/review/types/reviewData';

import EmptyAlert from '@components/molecules/EmptyAlert';
import ReviewCompactCardItem from '../molecules/ReviewCompactCardItem';

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: 20px;
	width: 100%;
`;

interface IReviewCompactCardListProps {
	reviews?: IReviewDetail[];
	isPending: boolean;
}

function ReviewCompactCardList({
	reviews,
	isPending,
}: IReviewCompactCardListProps): JSX.Element {
	if (isPending || !reviews) {
		return <ReviewCompactCardList.Skeleton />;
	}

	return (
		<Container>
			{reviews.length > 0 ? (
				reviews.map(review => (
					<ReviewCompactCardItem
						key={review.id}
						id={review.id}
						user={review.user}
						title={review.title}
						content={review.content}
						createdAt={review.createdAt}
						viewCount={review.viewCount}
						commentCount={review.commentCount}
						rating={review.rating}
					/>
				))
			) : (
				<EmptyAlert />
			)}
		</Container>
	);
}

ReviewCompactCardList.Skeleton = function (): JSX.Element {
	return (
		<Container>
			{Array.from({ length: 6 }).map(_ => (
				<ReviewCompactCardItem.Skeleton key={nanoid()} />
			))}
		</Container>
	);
};

export default ReviewCompactCardList;
