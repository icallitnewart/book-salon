import React from 'react';
import { styled } from 'styled-components';

import { stripHtmlTags } from '@utils/dataTransform';

import { Heading4 as Title, Paragraph as Summary, Span } from '@typographies';
import ReviewViewCount from './ReviewViewCount';
import ReviewCommentCount from './ReviewCommentCount';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	width: 100%;
	padding: 15px 20px;
`;

const Content = styled.div`
	width: 100%;
	height: 100%;
`;

const MetaInfo = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

const NumberInfo = styled.div`
	display: inline-flex;
	gap: 10px;
`;

interface IReviewSummaryProps {
	title: string;
	content: string;
	nickname: string;
	viewCount: number;
	commentCount: number;
}

function ReviewSummary({
	title,
	content,
	nickname,
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
					$marginBottom="5px"
					$ellipsis
				>
					{title}
				</Title>
				<Summary
					variant="list-body-sm"
					$lineClamp={2}
					$lineHeight={1.7}
					$ellipsis
				>
					{stripHtmlTags(content)}
				</Summary>
			</Content>
			<MetaInfo>
				<div>
					<Span variant="article-meta-md">by </Span>
					<Span variant="highlight-meta-md">{nickname}</Span>
				</div>
				<NumberInfo>
					<ReviewViewCount viewCount={viewCount} variantSize="md" />
					<ReviewCommentCount commentCount={commentCount} variantSize="md" />
				</NumberInfo>
			</MetaInfo>
		</Container>
	);
}

export default ReviewSummary;
