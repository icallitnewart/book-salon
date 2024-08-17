import React from 'react';
import { styled } from 'styled-components';

import { formatISODate } from '@utils/dateFormatter';

import { Span } from '@typographies';
import ReviewRatingDisplay from './ReviewRatingDisplay';

interface IContainerStyleProps {
	$marginBottom?: string;
}

const Container = styled.div<IContainerStyleProps>`
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 0px 2px;
	${({ $marginBottom }) => $marginBottom && `margin-bottom: ${$marginBottom};`}
`;

interface IReviewRatingWithDateProps extends IContainerStyleProps {
	variantSize?: 'sm' | 'md' | 'lg';
	rating: number;
	date: string;
}

function ReviewRatingWithDate({
	variantSize = 'md',
	rating,
	date,
	$marginBottom,
}: IReviewRatingWithDateProps): JSX.Element {
	return (
		<Container $marginBottom={$marginBottom}>
			<ReviewRatingDisplay rating={rating} size={variantSize} />
			<Span variant={`article-meta-${variantSize}`}>{formatISODate(date)}</Span>
		</Container>
	);
}

export default ReviewRatingWithDate;
