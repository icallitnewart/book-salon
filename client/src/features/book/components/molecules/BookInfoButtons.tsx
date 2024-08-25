import React from 'react';
import { styled } from 'styled-components';

import BookLikeButton from '../atoms/BookLikeButton';
import BookAddReviewButton from '../atoms/BookAddReviewButton';

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	gap: 15px;

	width: 100%;
	height: 50px;
	margin-bottom: 15px;
`;

function BookInfoButtons(): JSX.Element {
	return (
		<ButtonContainer>
			<BookLikeButton />
			<BookAddReviewButton />
		</ButtonContainer>
	);
}

export default BookInfoButtons;
