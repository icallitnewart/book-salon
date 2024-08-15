import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { styled } from 'styled-components';

import {
	validateReviewBook,
	validateReviewContent,
	validateReviewRating,
	validateReviewTags,
	validateReviewTitle,
} from '@features/review/utils/reviewValidator';

import { ROUTES } from '@constants/routes';
import { IBookDetail } from '@features/book/types/bookData';
import { IReviewFormProps } from '@features/review/types/reviewProps';

import {
	addIdsToTags,
	getReviewId,
	removeIdsFromTags,
} from '@features/review/utils/reviewFormUtils';
import useBookDetail from '@features/book/hooks/useBookDetail';

import { PrimaryInput as ReviewTitleInput } from '@inputs';
import {
	PrimaryButton as SubmitButton,
	SecondaryButton as CancelButton,
} from '@buttons';
import ReviewTagInputWithButton from '../molecules/ReviewTagInputWithButton';
import ReviewTextEditor from '../atoms/ReviewTextEditor';

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
	gap: 0px 15px;
`;

function ReviewForm<T extends boolean>({
	isEditMode,
	submitMutation,
	initialData,
}: IReviewFormProps<T>): JSX.Element {
	const navigate = useNavigate();
	const { isbn } = useParams();
	const { data: book } = useBookDetail(isbn || initialData?.book.isbn);

	const [title, setTitle] = useState('');
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

		const inputData: IReviewInput = {
			title,
			content,
			tags: removeIdsFromTags(tags),
			rating: 5,
		};

		const isSubmit = checkValidation(inputData, book);
		if (!isSubmit) return;

		const formData: IReviewForm = {
			...inputData,
			book,
		};

		const actionName = isEditMode ? '수정' : '등록';
		submitMutation(formData, {
			onSuccess: result => {
				const reviewId = getReviewId(result);
				alert(`리뷰가 성공적으로 ${actionName}되었습니다.`);
				navigate(ROUTES.REVIEW.DETAIL(reviewId));
			},
			onError: () => {
				alert(`리뷰 ${actionName}에 실패하였습니다. 다시 시도해주세요.`);
			},
		});
	};

	const handleCancel = () => {
		if (
			window.confirm('작성 중인 내용은 저장되지 않습니다. 정말 나가시겠어요?')
		) {
			navigate(-1);
		}
	};

	useEffect(() => {
		if (initialData) {
			setTitle(initialData.title);
			setTags(addIdsToTags(initialData.tags));
			setContent(initialData.content);
		}
	}, [initialData]);

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<ReviewTitleInput
					type="text"
					id="title"
					name="title"
					value={title}
					onChange={e => setTitle(e.target.value)}
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
					<CancelButton type="button" $width="140px" onClick={handleCancel}>
						취소
					</CancelButton>
					<SubmitButton type="submit" $width="140px">
						{isEditMode ? '수정하기' : '리뷰 등록'}
					</SubmitButton>
				</ButtonBox>
			</Form>
		</Container>
	);
}

export default ReviewForm;
