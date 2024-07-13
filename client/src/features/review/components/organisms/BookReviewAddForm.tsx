import React from 'react';
import { styled } from 'styled-components';

import { DarkGreenTextButton } from '@buttons/TextButtons/ColoredTextButtons';
import ReviewTagInputBox from '../molecules/ReviewTagInputBox';
import ReviewTextEditor from '../atoms/ReviewTextEditor';
import ReviewTitleInput from '../atoms/ReviewInput';

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

function BookReviewAddForm(): JSX.Element {
	return (
		<Container>
			<Form>
				<ReviewTitleInput
					placeholder="리뷰 제목을 입력해주세요. (40자 이하)"
					ariaLabel="리뷰 제목 입력 (40자 이하)"
					maxLength={40}
				/>
				<ReviewTagInputBox />
				<ReviewTextEditor />
				<ButtonBox>
					<DarkGreenTextButton type="submit" $width="140px">
						리뷰 등록
					</DarkGreenTextButton>
				</ButtonBox>
			</Form>
		</Container>
	);
}

export default BookReviewAddForm;
