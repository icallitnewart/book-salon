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
	PrimaryButton as SaveButton,
	SecondaryButton as CancelButton,
} from '@buttons';
import ReviewRatingModalTemplate from '../templates/ReviewRatingModalTemplate';
import ReviewTagInputWithButton from '../molecules/ReviewTagInputWithButton';
import ReviewTextEditor from '../atoms/ReviewTextEditor';

import { REVIEW_MAX_LEN } from '../../constants/limits';
import { IReviewInput, IReviewTags } from '../../types/reviewData';

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

interface IReviewInputOptional extends Omit<IReviewInput, 'rating'> {
	rating?: number;
}

function ReviewForm<T extends boolean>({
	isEditMode,
	submitMutation,
	initialData,
	isPending,
}: IReviewFormProps<T>): JSX.Element {
	const navigate = useNavigate();
	const { isbn } = useParams();
	const { data: book } = useBookDetail(isbn || initialData?.book.isbn);

	const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [tags, setTags] = useState<IReviewTags>([]);

	const addTag = (text: string) => {
		setTags(prev => [...prev, { id: nanoid(), text }]);
	};

	const removeTag = (id: string) => {
		setTags(prev => prev.filter(tag => tag.id !== id));
	};

	const checkInputValidation = (inputData: IReviewInputOptional) => {
		const error =
			validateReviewTitle(inputData.title) ||
			(tags.length > 0 && validateReviewTags(inputData.tags)) ||
			validateReviewContent(inputData.content) ||
			(inputData.rating !== undefined &&
				validateReviewRating(inputData.rating));

		if (error) {
			alert(error);
			return false;
		}

		return true;
	};

	const checkBookValidation = (
		bookData?: IBookDetail,
	): bookData is IBookDetail => {
		const error = validateReviewBook(bookData);

		if (error) {
			alert(error);
			return false;
		}

		return true;
	};

	const getInputData = (): IReviewInputOptional => {
		return {
			title,
			content,
			tags: removeIdsFromTags(tags),
		};
	};

	const validateAndOpenRatingModal = () => {
		const inputData = getInputData();
		const isInputValid = checkInputValidation(inputData);
		if (!isInputValid) return;

		setIsRatingModalOpen(true);
	};

	const handleSubmit = (rating: number) => {
		const isBookValid = checkBookValidation(book);
		if (!isBookValid) return;

		const inputData = getInputData();
		const isInputValid = checkInputValidation({ ...inputData, rating });
		if (!isInputValid) return;

		const formData = {
			...inputData,
			rating,
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
			<Form>
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
					<SaveButton
						type="button"
						$width="140px"
						onClick={validateAndOpenRatingModal}
					>
						{isEditMode ? '수정' : '저장'}
					</SaveButton>
				</ButtonBox>
			</Form>
			{isRatingModalOpen && (
				<ReviewRatingModalTemplate
					isOpen={isRatingModalOpen}
					closeModal={() => setIsRatingModalOpen(false)}
					handleSubmit={handleSubmit}
					isPending={isPending}
					initialRating={initialData?.rating}
				/>
			)}
		</Container>
	);
}

export default ReviewForm;
