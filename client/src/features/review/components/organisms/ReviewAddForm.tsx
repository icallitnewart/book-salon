import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { nanoid } from 'nanoid';

import useInput from '@hooks/useInput';
import useBookQueryData from '@features/book/hooks/useBookQueryData';
import {
	validateReviewBook,
	validateReviewContent,
	validateReviewRating,
	validateReviewTags,
	validateReviewTitle,
} from '@features/review/utils/reviewValidator';

import { ROUTES } from '@constants/routes';
import { IBookDetail } from '@features/book/types/bookData';

import { PrimaryInput as ReviewTitleInput } from '@inputs';
import { PrimaryButton as SubmitButton } from '@buttons';
import ReviewTagInputWithButton from '../molecules/ReviewTagInputWithButton';
import ReviewTextEditor from '../atoms/ReviewTextEditor';

import useAddReview from '../../hooks/useAddReview';
import { REVIEW_MAX_LEN } from '../../constants/limits';
import { IReviewForm, IReviewInput, IReviewTags } from '../../types/reviewData';

const Container = styled.div`
	width: 100%;
`;

const Form = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 25px 0px;
`;

const ButtonBox = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	padding: 20px 0px;
`;

function ReviewAddForm(): JSX.Element {
	const navigate = useNavigate();
	const { isbn } = useParams();
	const { getBookDetailQueryData } = useBookQueryData();
	const { addReview } = useAddReview();

	const { value: title, handleChange: handleTitleChange } = useInput('');
	const [content, setContent] = useState('');
	const [tags, setTags] = useState<IReviewTags>([]);

	const addTag = (text: string) => {
		setTags(prev => [...prev, { id: nanoid(), text }]);
	};

	const removeTag = (id: string) => {
		setTags(prev => prev.filter(tag => tag.id !== id));
	};

	const checkValidation = (
		inputData: IReviewInput,
		bookData?: IBookDetail,
	): bookData is IBookDetail => {
		const error =
			validateReviewTitle(inputData.title) ||
			(tags.length > 0 && validateReviewTags(inputData.tags)) ||
			validateReviewContent(inputData.content) ||
			validateReviewRating(inputData.rating) ||
			validateReviewBook(bookData);

		if (error) {
			alert(error);
			return false;
		}

		return true;
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const bookData: IBookDetail | undefined = getBookDetailQueryData(isbn);
		const inputData: IReviewInput = {
			title,
			content,
			tags: tags.map(tag => tag.text),
			rating: 5,
		};

		const isSubmit = checkValidation(inputData, bookData);
		if (!isSubmit) return;

		const formData: IReviewForm = {
			...inputData,
			book: bookData,
		};

		addReview(formData, {
			onSuccess: reviewId => {
				alert('리뷰가 등록되었습니다!');
				navigate(ROUTES.REVIEW.DETAIL(reviewId));
			},
			onError: () => {
				alert('리뷰 등록에 실패하였습니다. 다시 시도해주세요.');
			},
		});
	};

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<ReviewTitleInput
					type="text"
					id="title"
					name="title"
					value={title}
					onChange={handleTitleChange}
					placeholder={`리뷰 제목을 입력해주세요 (${REVIEW_MAX_LEN.TITLE}자 이하)`}
					ariaLabel={`리뷰 제목 입력 (${REVIEW_MAX_LEN.TITLE}자 이하)`}
					maxLength={REVIEW_MAX_LEN.TITLE}
				/>
				<ReviewTagInputWithButton
					tags={tags}
					addTag={addTag}
					removeTag={removeTag}
				/>
				<ReviewTextEditor
					value={content}
					handleChange={(value: string) => setContent(value)}
				/>
				<ButtonBox>
					<SubmitButton type="submit" $width="140px">
						리뷰 등록
					</SubmitButton>
				</ButtonBox>
			</Form>
		</Container>
	);
}

export default ReviewAddForm;
