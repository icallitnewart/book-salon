import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ROUTES } from '@constants/routes';

import { PrimaryButton } from '@buttons';

function BookAddReviewButton(): JSX.Element {
	const navigate = useNavigate();
	const { isbn } = useParams();

	const handleClick = () => {
		navigate(ROUTES.REVIEW.ADD(isbn));
	};

	return (
		<PrimaryButton $width="120px" onClick={handleClick}>
			리뷰 작성
		</PrimaryButton>
	);
}

export default BookAddReviewButton;
