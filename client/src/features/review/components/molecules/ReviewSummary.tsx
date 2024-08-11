import React from 'react';
import { styled } from 'styled-components';

import { stripHtmlTags } from '@utils/dataTransform';

import { Heading4 as Title, Paragraph as Summary, Span } from '@typographies';
import ReviewViewCount from './ReviewViewCount';

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

interface IReviewSummaryProps {
	title: string;
	content: string;
	nickname: string;
	viewCount: number;
}

function ReviewSummary({
	title,
	content,
	nickname,
	viewCount,
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
				<ReviewViewCount viewCount={viewCount} variantSize="md" />
			</MetaInfo>
		</Container>
	);
}

export default ReviewSummary;
