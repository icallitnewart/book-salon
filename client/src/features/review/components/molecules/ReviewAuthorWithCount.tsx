import React from 'react';
import { styled } from 'styled-components';

import { Span } from '@typographies';
import ReviewViewCount from './ReviewViewCount';
import ReviewCommentCount from './ReviewCommentCount';

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

const NumberInfo = styled.div`
	display: inline-flex;
	gap: 10px;
`;

interface IReviewAuthorWithCountProps {
	author: string;
	viewCount: number;
	commentCount: number;
	variantSize?: 'sm' | 'md' | 'lg';
}

function ReviewAuthorWithCount({
	author,
	viewCount,
	commentCount,
	variantSize = 'md',
}: IReviewAuthorWithCountProps): JSX.Element {
	return (
		<Container>
			<div>
				<Span variant={`article-meta-${variantSize}`}>by </Span>
				<Span variant={`highlight-meta-${variantSize}`}>{author}</Span>
			</div>
			<NumberInfo>
				<ReviewViewCount viewCount={viewCount} variantSize={variantSize} />
				<ReviewCommentCount
					commentCount={commentCount}
					variantSize={variantSize}
				/>
			</NumberInfo>
		</Container>
	);
}

export default ReviewAuthorWithCount;
