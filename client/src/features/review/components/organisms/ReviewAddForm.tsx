import React, { useState } from 'react';
import { styled } from 'styled-components';

import useInput from '@hooks/useInput';

import { PrimaryInput as ReviewTitleInput } from '@inputs';
import { PrimaryButton as SubmitButton } from '@buttons';
import ReviewTagInputWithButton from '../molecules/ReviewTagInputWithButton';
import ReviewTextEditor from '../atoms/ReviewTextEditor';

import { REVIEW_MAX_LEN } from '../../constants/limits';
import { IReviewTags } from '../../types/bookReview';

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
	const { value: title, handleChange: handleTitleChange } = useInput('');
	const [content, setContent] = useState('');
	const [tags, setTags] = useState<IReviewTags>([]);

	const addTag = (text: string) => {
		setTags(prev => [...prev, { id: Date.now(), text }]);
	};

	const removeTag = (id: number) => {
		setTags(prev => prev.filter(tag => tag.id !== id));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// TODO: submit 기능 추가 예정
		console.log({ title, content, tags, rating: 5 });
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
