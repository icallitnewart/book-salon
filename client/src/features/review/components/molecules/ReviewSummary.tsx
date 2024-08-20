import React from 'react';
import { styled } from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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

const SkeletonWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	gap: 15px;
`;

ReviewSummary.Skeleton = function (): JSX.Element {
	return (
		<Container>
			<SkeletonWrapper>
				<Skeleton width="100%" height={32} />
				<Skeleton width="100%" height={22} />
				<Skeleton width="100%" height={22} />
			</SkeletonWrapper>
		</Container>
	);
};

export default ReviewSummary;
