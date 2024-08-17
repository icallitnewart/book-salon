import React from 'react';
import { styled } from 'styled-components';

import ReviewRatingStar from '../atoms/ReviewRatingStar';

const StarButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0;

	background-color: transparent;
	border: none;
	cursor: pointer;

	svg {
		width: 35px;
		height: 35px;

		color: #fdee1e;
		stroke: #555;
		stroke-width: 0.6;
	}
`;

interface IReviewRatingButtonProps {
	index: number;
	rating: number;
	hoverRating: number;
	updateRating: (rating: number) => void;
	updateHoverRating: (rating: number) => void;
}

function ReviewRatingButton({
	index,
	rating,
	hoverRating,
	updateRating,
	updateHoverRating,
}: IReviewRatingButtonProps): JSX.Element {
	const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
		const starEl = e.currentTarget;
		if (!starEl) return;

		const { left, width } = starEl.getBoundingClientRect();
		const mouseX = e.clientX - left;
		const isLeft = mouseX < width / 2;
		const score = index - (isLeft ? 0.5 : 0);
		updateHoverRating(score);
	};

	const handleClick = () => {
		updateRating(hoverRating);
	};

	return (
		<StarButton
			type="button"
			onMouseMove={handleMouseMove}
			onClick={handleClick}
		>
			<ReviewRatingStar index={index} score={hoverRating || rating} />
		</StarButton>
	);
}

export default ReviewRatingButton;
