import React from 'react';
import styled from 'styled-components';

import { IReviewDetail } from '@features/review/types/reviewData';

import ReviewCardItem from '../molecules/ReviewCardItem';

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 30px;
	width: 100%;
`;

interface IReviewCardListProps {
	reviews: IReviewDetail[];
}

function ReviewCardList({ reviews }: IReviewCardListProps): JSX.Element {
	return (
		<Container>
			{reviews.length > 0 &&
				reviews.map(review => (
					<ReviewCardItem key={review.id} review={review} />
				))}
		</Container>
	);
}

export default ReviewCardList;
