import React, { useState } from 'react';
import { styled } from 'styled-components';

import { PrimaryInput as ReviewTitleInput } from '@inputs';

import { PrimaryButton } from '@buttons';
import ReviewTagInputWithButton from '../molecules/ReviewTagInputWithButton';
import ReviewTextEditor from '../atoms/ReviewTextEditor';

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

const REVIEW_TITLE_MAX_LEN = 40;

function ReviewAddForm(): JSX.Element {
	// TODO: 커스텀훅으로 변경
	const [value, setValue] = useState('');

	return (
		<Container>
			<Form>
				<ReviewTitleInput
					type="text"
					id="title"
					name="title"
					value={value}
					onChange={e => setValue(e.target.value)}
					placeholder={`리뷰 제목을 입력해주세요. (${REVIEW_TITLE_MAX_LEN}자 이하)`}
					ariaLabel={`리뷰 제목 입력 (${REVIEW_TITLE_MAX_LEN}자 이하)`}
					maxLength={REVIEW_TITLE_MAX_LEN}
				/>
				<ReviewTagInputWithButton />
				<ReviewTextEditor />
				<ButtonBox>
					<PrimaryButton type="submit" $width="140px">
						리뷰 등록
					</PrimaryButton>
				</ButtonBox>
			</Form>
		</Container>
	);
}

export default ReviewAddForm;
