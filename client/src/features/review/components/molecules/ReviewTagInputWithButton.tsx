import React from 'react';
import { styled } from 'styled-components';

import useInput from '@hooks/useInput';

import { PrimaryInput as ReviewTagInput } from '@inputs';
import { PrimaryButton as AddButton } from '@buttons';
import ReviewTagListWithButton from './ReviewTagListWithButton';

import { IReviewTags } from '../../types/bookReview';
import { REVIEW_MAX_LEN } from '../../constants/limits';

import {
	generateTagInputAriaLabel,
	generateTagInputPlaceholder,
} from '../../utils/reviewFormUtils';

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr 120px;
	gap: 15px;
	width: 100%;
	margin-bottom: 5px;
`;

interface IReviewTagInputWithButtonProps {
	tags: IReviewTags;
	addTag: (value: string) => void;
	removeTag: (id: string) => void;
}

function ReviewTagInputWithButton({
	tags,
	addTag,
	removeTag,
}: IReviewTagInputWithButtonProps): JSX.Element {
	const { value, handleChange, resetValue } = useInput('');
	const isTagsFull = tags.length >= REVIEW_MAX_LEN.TAGS;

	const handleAddTag = () => {
		if (isTagsFull) return;
		if (value.trim() === '') return;

		addTag(value);
		resetValue();
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleAddTag();
		}
	};

	return (
		<Container>
			<ReviewTagInput
				type="text"
				id="tag"
				name="tag"
				value={value}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				placeholder={generateTagInputPlaceholder(isTagsFull)}
				aria-label={generateTagInputAriaLabel(isTagsFull)}
				maxLength={REVIEW_MAX_LEN.TAG_INPUT}
				disabled={isTagsFull}
			/>
			<AddButton type="button" onClick={handleAddTag}>
				태그 추가
			</AddButton>
			{tags.length > 0 && (
				<ReviewTagListWithButton tags={tags} removeTag={removeTag} />
			)}
		</Container>
	);
}

export default ReviewTagInputWithButton;
