import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

import { IReviewDetail } from '@features/review/types/reviewData';
import { ROUTES } from '@constants/routes';

import BookPreviewImage from '@features/book/components/molecules/BookPreviewImage';
import ReviewSummary from './ReviewSummary';

const Container = styled.article`
	width: calc(100% / 3 - 20px);
	height: 370px;

	background-color: #fff;
	box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.04);
	border: 1px solid #eee;
	border-radius: 5px;
`;

const StyledLink = styled(Link)`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`;

interface IReviewCardItemProps {
	review: IReviewDetail;
}

function ReviewCardItem({ review }: IReviewCardItemProps): JSX.Element {
	const [isHovered, setIsHovered] = useState(false);
	return (
		<Container
			onMouseOver={() => setIsHovered(true)}
			onMouseOut={() => setIsHovered(false)}
		>
			<StyledLink to={ROUTES.REVIEW.DETAIL(review.id)}>
				<BookPreviewImage
					title={review.book.title}
					cover={review.book.cover}
					author={review.book.author}
					publisher={review.book.publisher}
					isHovered={isHovered}
					$bgBorderRadius="5px 5px 0 0"
				/>
				<ReviewSummary
					title={review.title}
					content={review.content}
					nickname={review.user.nickname}
					viewCount={review.viewCount}
					commentCount={review.commentCount}
				/>
			</StyledLink>
		</Container>
	);
}

export default ReviewCardItem;
