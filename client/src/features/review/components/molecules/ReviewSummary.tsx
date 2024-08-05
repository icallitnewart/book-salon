import React from 'react';
import { styled } from 'styled-components';

import { stripHtmlTags } from '@utils/dataTransform';

import { Heading4 as Title, Paragraph as Summary, Span } from '@typographies';

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
					$lineHeight={1.8}
					$lineClamp={2}
					$marginTop="-0.4rem"
					$ellipsis
				>
					{title}
				</Title>
				<Summary
					variant="list-body-sm"
					$lineClamp={4}
					$lineHeight={1.8}
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
				<Span variant="article-meta-md">{viewCount} views</Span>
			</MetaInfo>
		</Container>
	);
}

export default ReviewSummary;
