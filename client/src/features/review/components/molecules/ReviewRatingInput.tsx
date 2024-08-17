import React, { useState } from 'react';
import { styled } from 'styled-components';

import ReviewRatingButton from './ReviewRatingButton';

const Container = styled.div`
	display: flex;
	justify-content: center;
	gap: 7px;
`;

interface IReviewRatingInputProps {
	rating: number;
	updateRating: (rating: number) => void;
}

function ReviewRatingInput({
	rating,
	updateRating,
}: IReviewRatingInputProps): JSX.Element {
	const [hoverRating, setHoverRating] = useState(0);

	const handleMouseLeave = () => {
		setHoverRating(0);
	};

	return (
		<Container onMouseLeave={handleMouseLeave}>
			{[1, 2, 3, 4, 5].map(index => (
				<ReviewRatingButton
					key={index}
					index={index}
					rating={rating}
					hoverRating={hoverRating}
					updateRating={updateRating}
					updateHoverRating={setHoverRating}
				/>
			))}
		</Container>
	);
}

export default ReviewRatingInput;
