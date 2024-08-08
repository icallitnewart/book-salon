import React from 'react';
import styled from 'styled-components';

import useInput from '@hooks/useInput';

import { PrimaryButton, SubtleButton } from '@buttons';
import ReviewCommentTextarea from '../atoms/ReviewCommentTextarea';

const Form = styled.form`
	width: 350px;
	padding: 15px 0px;
`;

const InputContainer = styled.div`
	width: 100%;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	gap: 15px;
	width: 100%;
	padding: 20px 15px 0px;
`;

interface IReviewCommentEditFormProps {
	content: string;
	closeModal: () => void;
}

function ReviewCommentEditForm({
	content,
	closeModal,
}: IReviewCommentEditFormProps): JSX.Element {
	const { value, handleChange } = useInput(content);

	return (
		<Form>
			<InputContainer>
				<ReviewCommentTextarea
					id="content"
					name="content"
					value={value}
					handleChange={handleChange}
				/>
			</InputContainer>
			<ButtonContainer>
				<SubtleButton
					type="button"
					$hoverBgColor="none"
					$boxShadow="none"
					onClick={closeModal}
				>
					수정 취소
				</SubtleButton>
				<PrimaryButton type="button" $boxShadow="none">
					댓글 수정
				</PrimaryButton>
			</ButtonContainer>
		</Form>
	);
}

export default ReviewCommentEditForm;
