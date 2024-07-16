import React, { useState } from 'react';
import { styled } from 'styled-components';

import { PrimaryInput as ReviewTagInput } from '@inputs';
import { PrimaryButton } from '@buttons';
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

const TAG_MAX_LEN = 5;
const TAG_LETTER_MAX_LEN = 8;

function ReviewTagInputWithButton(): JSX.Element {
	// TODO: 커스텀훅으로 변경
	const [value, setValue] = useState('');

	return (
		<Container>
			<ReviewTagInput
				type="text"
				id="tag"
				name="tag"
				value={value}
				onChange={e => setValue(e.target.value)}
				placeholder={`태그를 입력해주세요. (${TAG_LETTER_MAX_LEN}자 이하, 최대 ${TAG_MAX_LEN}개)`}
				aria-label={`태그 입력 (${TAG_LETTER_MAX_LEN}자 이하, 최대 ${TAG_MAX_LEN}개)`}
				maxLength={TAG_LETTER_MAX_LEN}
			/>
			<PrimaryButton>태그 추가</PrimaryButton>
			{tags.length > 0 && <ReviewTagListWithButton tags={tags} />}
		</Container>
	);
}

export default ReviewTagInputWithButton;
