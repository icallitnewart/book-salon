import React from 'react';
import styled from 'styled-components';

import { Paragraph as TotalComment } from '@typographies';
import ReviewCommentTextAreaWithButton from '../molecules/ReviewCommentTextAreaWithButton';
import ReviewCommentList from './ReviewCommentList';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 20px;
`;

function ReviewCommentBox(): JSX.Element {
	return (
		<Container>
			<TotalComment
				variant="article-title-sm"
				$lineHeight={1.8}
				$margin="6px 8px"
			>
				댓글 0
			</TotalComment>
			<ReviewCommentList />
			<ReviewCommentTextAreaWithButton />
		</Container>
	);
}

export default ReviewCommentBox;
