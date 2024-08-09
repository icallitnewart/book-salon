import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import useInput from '@hooks/useInput';
import useUpdateReviewComment from '@features/review/hooks/useUpdateReviewComment';
import { validateReviewCommentContent } from '@features/review/utils/reviewValidator';

import { IReviewCommentForm } from '@features/review/types/reviewCommentData';

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
	commentId: string;
}

function ReviewCommentEditForm({
	content,
	closeModal,
	commentId,
}: IReviewCommentEditFormProps): JSX.Element {
	const { reviewId } = useParams();
	const { value, handleChange } = useInput(content);
	const { updateReviewComment, initialiseQueryAfterMutation } =
		useUpdateReviewComment(commentId, reviewId);

	const checkValidation = () => {
		const error = validateReviewCommentContent(value);

		if (error) {
			alert(error);
			return false;
		}

		return true;
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const isSubmit = checkValidation();
		if (!isSubmit) return;

		const formData: IReviewCommentForm = {
			content: value,
		};

		updateReviewComment(formData, {
			onSuccess: () => {
				alert('댓글이 수정되었습니다.');
				initialiseQueryAfterMutation();
				closeModal();
			},
			onError: () => {
				alert('댓글 수정에 실패했습니다. 다시 시도해주세요.');
			},
		});
	};

	return (
		<Form onSubmit={handleSubmit}>
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
				<PrimaryButton type="submit" $boxShadow="none">
					댓글 수정
				</PrimaryButton>
			</ButtonContainer>
		</Form>
	);
}

export default ReviewCommentEditForm;
