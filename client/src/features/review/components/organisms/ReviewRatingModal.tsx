import React, { useState } from 'react';
import styled from 'styled-components';

import { PrimaryButton, SubtleButton } from '@buttons';
import { Heading2 as Title } from '@typographies';
import ReviewRatingInput from '../molecules/ReviewRatingInput';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 220px;
	padding: 30px 20px 20px;
`;

const ButtonContainer = styled.div`
	display: flex;
	gap: 15px;
	width: 100%;
`;

interface IReviewRatingModalProps {
	closeModal: () => void;
	handleSubmit: (rating: number) => void;
	initialRating?: number;
	isPending?: boolean;
}

function ReviewRatingModal({
	closeModal,
	handleSubmit,
	initialRating,
	isPending,
}: IReviewRatingModalProps): JSX.Element {
	const [rating, setRating] = useState(initialRating || 0);

	return (
		<Container>
			<div>
				<Title
					variant="article-subtitle-md"
					$textAlign="center"
					$marginBottom="20px"
				>
					별점을 선택해주세요
				</Title>
				<ReviewRatingInput rating={rating} updateRating={setRating} />
			</div>
			<ButtonContainer>
				<SubtleButton onClick={closeModal} $hoverBgColor="none">
					취소
				</SubtleButton>
				<PrimaryButton
					onClick={() => handleSubmit(rating)}
					isPending={isPending}
				>
					등록
				</PrimaryButton>
			</ButtonContainer>
		</Container>
	);
}

export default ReviewRatingModal;
