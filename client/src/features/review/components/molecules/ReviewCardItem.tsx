import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

import { IBookReview } from '@features/review/types/bookReview';

import Divider from '@components/atoms/Divider';
import { Heading3, Paragraph, Span } from '@typographies/TextElements';

const LinkContainer = styled(Link)`
	width: calc(100% / 2 - 10px);
	height: 250px;
	transition: transform 0.3s;
	cursor: pointer;

	&:hover {
		transform: translateY(-5px);
	}
`;

const Article = styled.article`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	padding: 35px 30px 30px;

	border-radius: 10px;
	border: 1px solid #eee;
	background-color: #fff;
	box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.05);
`;

const AdditionalInfo = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

const Content = styled.div`
	flex: 1;
`;

function ReviewCardItem({
	id,
	nickname,
	title,
	content,
	date,
}: IBookReview): JSX.Element {
	return (
		<LinkContainer to="/">
			<Article>
				<Heading3 variant="list-title-md" $color="#333" $marginBottom="10px">
					{title}
				</Heading3>
				<Divider $marginTop="1px" $marginBottom="10px" />
				<Content>
					<Paragraph
						variant="list-body-lg"
						$lineHeight={1.7}
						$ellipsis
						$lineClamp={3}
					>
						{content}
					</Paragraph>
				</Content>
				<AdditionalInfo>
					<Span
						variant="highlight-meta-lg"
						$fontWeight={500}
						$color="var(--sub-color-darkgreen)"
						$letterSpacing={1}
					>
						{nickname}
					</Span>
					<Span variant="list-meta-lg" $color="#999">
						{date}
					</Span>
				</AdditionalInfo>
			</Article>
		</LinkContainer>
	);
}

export default ReviewCardItem;
