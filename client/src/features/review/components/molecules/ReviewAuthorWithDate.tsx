import React from 'react';
import styled from 'styled-components';

import { formatISODate } from '@utils/dateFormatter';

import { Span } from '@typographies';

interface IContainerStyleProps {
	$width?: string;
	$flex?: number | string;
}

const Container = styled.div<IContainerStyleProps>`
	${({ $width }) => $width && `width: ${$width};`}
	${({ $flex }) => $flex && `flex: ${$flex};`}
`;

interface IReviewAuthorWithDateProps extends IContainerStyleProps {
	author?: string;
	date?: string;
	variantSize?: 'sm' | 'md' | 'lg';
}

function ReviewAuthorWithDate({
	author,
	date,
	variantSize = 'md',
	$width,
	$flex,
}: IReviewAuthorWithDateProps) {
	return (
		<Container $width={$width} $flex={$flex}>
			<Span variant={`highlight-meta-${variantSize}`}>{author || ''}</Span>
			<Span variant={`article-meta-${variantSize}`} $margin="0px 3px">
				·
			</Span>
			<Span variant={`article-meta-${variantSize}`} $flex="1">
				{date ? formatISODate(date) : ''}
			</Span>
		</Container>
	);
}

export default ReviewAuthorWithDate;
