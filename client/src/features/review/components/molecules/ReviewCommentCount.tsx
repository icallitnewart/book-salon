import React from 'react';
import { styled } from 'styled-components';

import { ReactComponent as CommentSvg } from '@assets/svg/comment.svg';
import { SpanWithStyles } from '@typographies';

const Container = styled(SpanWithStyles)`
	display: inline-flex;
	align-items: center;
	gap: 5px;
`;

const CommentIcon = styled(CommentSvg)`
	width: 18px;
	height: 18px;
	fill: #888;
	margin-bottom: -2px;
`;

interface IReviewCommentCountProps {
	commentCount: number;
	variantSize: 'sm' | 'md' | 'lg';
}

function ReviewCommentCount({
	commentCount,
	variantSize = 'md',
}: IReviewCommentCountProps): JSX.Element {
	return (
		<Container variant={`article-meta-${variantSize}`}>
			<CommentIcon /> {commentCount}
		</Container>
	);
}

export default ReviewCommentCount;
