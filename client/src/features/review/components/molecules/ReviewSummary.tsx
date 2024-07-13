import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

import { Heading4, Paragraph, Span } from '@typographies/TextElements';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	height: 100%;

	&:hover {
		h4 {
			color: #666;
		}
		p {
			color: #888;
			text-decoration: underline;
		}
	}
`;

const Content = styled.div`
	width: 100%;
`;

const MetaInfo = styled.div`
	width: 100%;
	text-align: right;
	margin-bottom: 10px;
`;

interface IReviewSummaryProps {
	title: string;
	content: string;
	nickname: string;
	link: string;
}

function ReviewSummary({
	title,
	content,
	nickname,
	link,
}: IReviewSummaryProps): JSX.Element {
	return (
		<Container>
			<Link to={link || ''}>
				<Content>
					<Heading4
						variant="list-title-sm"
						$color="#333"
						$lineHeight={1.8}
						$lineClamp={2}
						$marginTop="-0.4rem"
						$ellipsis
						$marginBottom="8px"
					>
						{title}
					</Heading4>
					<Paragraph
						variant="list-body-md"
						$lineClamp={4}
						$lineHeight={1.8}
						$ellipsis
					>
						{content}
					</Paragraph>
				</Content>
			</Link>
			<MetaInfo>
				<Span variant="highlight-meta-md">{nickname}</Span>
			</MetaInfo>
		</Container>
	);
}

export default ReviewSummary;
