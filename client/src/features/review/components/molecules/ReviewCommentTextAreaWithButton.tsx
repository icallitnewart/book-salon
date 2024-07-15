import React from 'react';
import { styled } from 'styled-components';

import ReviewTextArea from '@features/review/components/atoms/ReviewTextArea';
import TextButton from '@buttons/TextButton';

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
			<TextButton variant="green" $width="100px">
				작성
			</TextButton>
		</Container>
	);
}

export default ReviewCommentTextAreaWithButton;
