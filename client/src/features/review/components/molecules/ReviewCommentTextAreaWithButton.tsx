import React from 'react';
import { styled } from 'styled-components';

import { DarkGreenTextButton } from '@buttons/TextButtons/ColoredTextButtons';
import ReviewTextArea from '@features/review/components/atoms/ReviewTextArea';

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex: 1;
	gap: 15px;
`;

function ReviewCommentTextAreaWithButton(): JSX.Element {
	return (
		<Container>
			<ReviewTextArea
				placeholder="리뷰에 대한 댓글을 입력해주세요."
				ariaLabel="리뷰에 대한 댓글 입력"
			/>
			<DarkGreenTextButton $width="100px">작성</DarkGreenTextButton>
		</Container>
	);
}

export default ReviewCommentTextAreaWithButton;
