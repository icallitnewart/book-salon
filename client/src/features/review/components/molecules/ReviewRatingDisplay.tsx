import React from 'react';
import { styled } from 'styled-components';

import ReviewRatingStar from '../atoms/ReviewRatingStar';

interface IContainerStyleProps {
	$starSize?: 'sm' | 'md' | 'lg';
}

const Container = styled.div<IContainerStyleProps>`
	display: inline-flex;
	align-items: center;
	gap: 3px;

	svg {
		width: ${({ $starSize }) => ($starSize === 'sm' ? '12px' : '14px')};
		height: ${({ $starSize }) => ($starSize === 'sm' ? '12px' : '14px')};

		color: #fdee1e;
		stroke: #555;
		stroke-width: 0.3;
	}
`;

interface IReviewRatingDisplayProps {
	rating: number;
	size?: 'sm' | 'md' | 'lg';
}

function ReviewRatingDisplay({
	rating,
	size = 'md',
}: IReviewRatingDisplayProps): JSX.Element {
	return (
		<Container $starSize={size}>
			{[1, 2, 3, 4, 5].map(index => (
				<ReviewRatingStar key={index} index={index} score={rating} />
			))}
		</Container>
	);
}

export default ReviewRatingDisplay;
