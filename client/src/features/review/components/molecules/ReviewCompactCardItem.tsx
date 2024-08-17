import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

import { IReviewPreview } from '@features/review/types/reviewData';
import { ROUTES } from '@constants/routes';

import { stripHtmlTags } from '@utils/dataTransform';

import { Heading3, Paragraph } from '@typographies';
import Divider from '@components/atoms/Divider';
import ReviewAuthorWithCount from './ReviewAuthorWithCount';
import ReviewRatingWithDate from './ReviewRatingWithDate';

const LinkContainer = styled(Link)`
	width: calc(100% / 2 - 10px);
	height: 250px;
	transition: transform 0.3s;
	cursor: pointer;
`;

const Article = styled.article`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	padding: 27px 32px;

	border-radius: 10px;
	border: 1px solid #eee;
	background-color: #fff;
	box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.05);
`;

const Content = styled.div`
	flex: 1;
`;

interface IReviewCompactCardItemProps extends IReviewPreview {
	commentCount: number;
	rating: number;
}

function ReviewCompactCardItem({
	id,
	user,
	title,
	content,
	createdAt,
	viewCount,
	rating,
	commentCount,
}: IReviewCompactCardItemProps): JSX.Element {
	return (
		<LinkContainer to={ROUTES.REVIEW.DETAIL(id)}>
			<Article>
				<Heading3
					variant="list-title-lg"
					$color="#333"
					$marginBottom="10px"
					$lineClamp={1}
					$ellipsis
				>
					{title}
				</Heading3>
				<Divider $marginBottom="7px" />
				<ReviewRatingWithDate
					rating={rating}
					date={createdAt}
					$marginBottom="5px"
				/>
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
				<ReviewAuthorWithCount
					author={user.nickname}
					viewCount={viewCount}
					commentCount={commentCount}
					variantSize="lg"
				/>
			</Article>
		</LinkContainer>
	);
}

export default ReviewCompactCardItem;
