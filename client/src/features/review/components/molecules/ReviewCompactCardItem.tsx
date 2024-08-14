import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

import { IReviewPreview } from '@features/review/types/reviewData';
import { ROUTES } from '@constants/routes';

import { stripHtmlTags } from '@utils/dataTransform';

import { Heading3, Paragraph } from '@typographies';
import Divider from '@components/atoms/Divider';
import ReviewAuthorWithDate from './ReviewAuthorWithDate';
import ReviewViewCount from './ReviewViewCount';
import ReviewCommentCount from './ReviewCommentCount';

const LinkContainer = styled(Link)`
	width: calc(100% / 2 - 10px);
	height: 220px;
	transition: transform 0.3s;
	cursor: pointer;
`;

const Article = styled.article`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	padding: 25px 30px;

	border-radius: 10px;
	border: 1px solid #eee;
	background-color: #fff;
	box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.05);
`;

const MetaInfo = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;

	margin-bottom: 5px;
`;

const NumberInfo = styled.div`
	display: inline-flex;
	gap: 10px;
`;

const Content = styled.div`
	flex: 1;
`;

interface IReviewCompactCardItemProps extends IReviewPreview {
	commentCount: number;
}

function ReviewCompactCardItem({
	id,
	user,
	title,
	content,
	createdAt,
	viewCount,
	commentCount,
}: IReviewCompactCardItemProps): JSX.Element {
	return (
		<LinkContainer to={ROUTES.REVIEW.DETAIL(id)}>
			<Article>
				<Heading3
					variant="list-title-lg"
					$color="#333"
					$marginBottom="8px"
					$lineClamp={1}
					$ellipsis
				>
					{title}
				</Heading3>
				<Divider $marginBottom="10px" />
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
					<ReviewAuthorWithDate author={user.nickname} date={createdAt} />
					<NumberInfo>
						<ReviewViewCount viewCount={viewCount} variantSize="lg" />
						<ReviewCommentCount commentCount={commentCount} variantSize="lg" />
					</NumberInfo>
				</MetaInfo>
			</Article>
		</LinkContainer>
	);
}

export default ReviewCompactCardItem;
