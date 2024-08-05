import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

import { IReviewPreview } from '@features/review/types/reviewData';
import { ROUTES } from '@constants/routes';

import { stripHtmlTags } from '@utils/dataTransform';
import { formatISODate } from '@utils/dateFormatter';

import { Heading3, Paragraph, Span } from '@typographies';
import Divider from '@components/atoms/Divider';

const LinkContainer = styled(Link)`
	width: calc(100% / 2 - 10px);
	height: 230px;
	transition: transform 0.3s;
	cursor: pointer;
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

const MetaInfo = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

const Content = styled.div`
	flex: 1;
`;

function ReviewCardItem({
	id,
	user,
	title,
	content,
	createdAt,
}: IReviewPreview): JSX.Element {
	return (
		<LinkContainer to={ROUTES.REVIEW.DETAIL(id)}>
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
						{stripHtmlTags(content)}
					</Paragraph>
				</Content>
				<MetaInfo>
					<Span variant="highlight-meta-lg">{user.nickname}</Span>
					<Span variant="list-meta-lg" $color="#999">
						{createdAt && formatISODate(createdAt)}
					</Span>
				</MetaInfo>
			</Article>
		</LinkContainer>
	);
}

export default ReviewCardItem;
