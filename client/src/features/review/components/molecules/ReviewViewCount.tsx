import React from 'react';
import { styled } from 'styled-components';

import { ReactComponent as ViewSvg } from '@assets/svg/eyes.svg';
import { SpanWithStyles } from '@typographies';

const Container = styled(SpanWithStyles)`
	display: inline-flex;
	align-items: center;
	gap: 2px;
`;

const ViewIcon = styled(ViewSvg)`
	width: 20px;
	height: 20px;
	fill: #888;
	margin-bottom: -2px;
`;

interface IReviewViewCountProps {
	viewCount: number;
	variantSize: 'sm' | 'md' | 'lg';
}

function ReviewViewCount({
	viewCount,
	variantSize = 'md',
}: IReviewViewCountProps): JSX.Element {
	return (
		<Container variant={`article-meta-${variantSize}`}>
			<ViewIcon /> {viewCount}
		</Container>
	);
}

export default ReviewViewCount;
