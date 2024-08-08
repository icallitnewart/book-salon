import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import useInput from '@hooks/useInput';
import useAuthUser from '@features/user/hooks/useAuthUser';
import useAddReviewComment from '@features/review/hooks/useAddReviewComment';
import { validateReviewCommentContent } from '@features/review/utils/reviewValidator';

import {
	IReviewCommentForm,
	IReviewCommentWithCount,
} from '@features/review/types/reviewCommentData';
import { ROUTES } from '@constants/routes';

import { PrimaryButton } from '@buttons';
import { PrimaryTextarea } from '@inputs';

const Form = styled.form`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex: 1;
	gap: 15px;
`;

function ReviewCommentForm(): JSX.Element {
	const { reviewId } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const content = useInput('');
	const { data: isAuth } = useAuthUser({
		select: data => data.isAuth,
	});
	const { addReviewComment, initialiseQueryAfterMutation } =
		useAddReviewComment(reviewId);

	const checkValidation = () => {
		const error = validateReviewCommentContent(content.value);

		if (error) {
			alert(error);
			return false;
		}

		return true;
	};

	const redirectToLogin = () => {
		navigate(ROUTES.USER.LOGIN, {
			state: { from: { pathname: location.pathname } },
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!isAuth) {
			redirectToLogin();
			return;
		}

		const isSubmit = checkValidation();
		if (!isSubmit) return;

		const formData: IReviewCommentForm = {
			content: content.value,
		};

		addReviewComment(formData, {
			onSuccess: ({ commentCount }: IReviewCommentWithCount) => {
				alert('댓글이 성공적으로 등록되었습니다.');
				initialiseQueryAfterMutation(commentCount);
				content.resetValue();
			},
			onError: () => {
				alert('댓글 등록에 실패했습니다. 다시 시도해주세요.');
			},
		});
	};

	return (
		<Form onSubmit={handleSubmit}>
			<PrimaryTextarea
				value={content.value}
				onChange={content.handleChange}
				id="content"
				name="content"
				placeholder={
					isAuth
						? '리뷰에 대한 댓글을 입력해주세요.'
						: '로그인 후 댓글을 작성할 수 있습니다.'
				}
				ariaLabel="리뷰에 대한 댓글 입력"
				disabled={!isAuth}
				$minHeight="50px"
				$height="auto"
			/>
			<PrimaryButton type="submit" $width="100px">
				작성
			</PrimaryButton>
		</Form>
	);
}

export default ReviewCommentForm;
