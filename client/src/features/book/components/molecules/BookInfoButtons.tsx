import React from 'react';
import { styled } from 'styled-components';

import LikeBookButton from '../atoms/LikeBookButton';
import WriteReviewButton from '../atoms/WriteReviewButton';

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	gap: 15px;

	width: 100%;
	height: 50px;
`;

function BookInfoButtons(): JSX.Element {
	return (
		<ButtonContainer>
			<LikeBookButton />
			<WriteReviewButton />
		</ButtonContainer>
	);
}

export default BookInfoButtons;
