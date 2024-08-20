import React from 'react';
import { styled } from 'styled-components';

import { stripHtmlTags } from '@utils/dataTransform';

import { Heading4 as Title, Paragraph as Summary } from '@typographies';
import ReviewRatingWithDate from './ReviewRatingWithDate';
import ReviewAuthorWithCount from './ReviewAuthorWithCount';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	width: 100%;
	padding: 20px 20px;
`;

const Content = styled.div`
	width: 100%;
	height: 100%;
`;

interface IReviewSummaryProps {
	title: string;
	content: string;
	nickname: string;
	rating: number;
	date: string;
	viewCount: number;
	commentCount: number;
}

function ReviewSummary({
	title,
	content,
	nickname,
	rating,
	date,
	viewCount,
	commentCount,
}: IReviewSummaryProps): JSX.Element {
	return (
		<Container>
			<Content>
				<Title
					variant="list-title-sm"
					$color="#333"
					$lineHeight={1.5}
					$lineClamp={1}
					$marginBottom="4px"
					$ellipsis
				>
					{title}
				</Title>
				<ReviewRatingWithDate rating={rating} date={date} $marginBottom="6px" />
				<Summary
					variant="list-body-sm"
					$lineClamp={2}
					$lineHeight={1.7}
					$ellipsis
				>
					{stripHtmlTags(content)}
				</Summary>
			</Content>
			<ReviewAuthorWithCount
				author={nickname}
				viewCount={viewCount}
				commentCount={commentCount}
			/>
		</Container>
	);
}

export default ReviewSummary;
