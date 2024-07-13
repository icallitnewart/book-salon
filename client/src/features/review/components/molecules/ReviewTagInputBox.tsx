import React from 'react';
import { styled } from 'styled-components';

import { DarkGreenTextButton } from '@buttons/TextButtons/ColoredTextButtons';
import ReviewInput from '../atoms/ReviewInput';
import ReviewTagListWithButton from './ReviewTagListWithButton';

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr 120px;
	gap: 15px;
	width: 100%;
	margin-bottom: 5px;
`;

interface IReviewTag {
	id: number;
	text: string;
}

const tags: IReviewTag[] = [
	{
		id: 1,
		text: '태그태그1',
	},
	{
		id: 2,
		text: '태그태그2',
	},
	{
		id: 3,
		text: '태그태그3',
	},
];

function ReviewTagInputBox(): JSX.Element {
	const TAG_MAX_LEN = 5;
	const TAG_LETTER_MAX_LEN = 8;

	return (
		<Container>
			<ReviewInput
				placeholder={`태그를 입력해주세요. (${TAG_LETTER_MAX_LEN}자 이하, 최대 ${TAG_MAX_LEN}개)`}
				aria-label={`태그 입력 (${TAG_LETTER_MAX_LEN}자 이하, 최대 ${TAG_MAX_LEN}개)`}
				maxLength={TAG_LETTER_MAX_LEN}
			/>
			<DarkGreenTextButton>태그 추가</DarkGreenTextButton>
			{tags.length > 0 && <ReviewTagListWithButton tags={tags} />}
		</Container>
	);
}

export default ReviewTagInputBox;
