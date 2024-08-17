import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { IReviewPreview } from '@features/review/types/reviewData';
import { IBookDetail } from '@features/book/types/bookData';
import { ROUTES } from '@constants/routes';

import { stripHtmlTags } from '@utils/dataTransform';

import BookCoverImage from '@features/book/components/atoms/BookCoverImage';
import {
	Heading3 as ReviewTitle,
	Paragraph as ReviewContent,
} from '@typographies';
import ReviewRatingDisplay from './ReviewRatingDisplay';
import ReviewTagList from './ReviewTagList';
import ReviewAuthorWithDate from './ReviewAuthorWithDate';

const Container = styled.li`
	width: 100%;
	height: 180px;
	padding: 0px 10px;
	cursor: pointer;

	&:hover {
		background-color: #f6f7f8;
		/* rgba(0, 247, 153, 0.1); */
	}
`;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;
	padding: 0px 20px;

	border-bottom: 1px solid #e0e0e0;
`;

const ReviewInfoTextBox = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;

	padding: 20px 0px 20px 30px;
`;

const ReviewRatingWithAuthor = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 6px;
`;

const ContentWrapper = styled.div`
	flex: 1;
`;

interface IReviewSearchItemProps extends IReviewPreview {
	book: IBookDetail;
	tags: string[];
	closeModal: () => void;
}

function ReviewSearchItem({
	id,
	title,
	user,
	content,
	rating,
	createdAt,
	tags,
	book,
	closeModal,
}: IReviewSearchItemProps): JSX.Element {
	const navigate = useNavigate();
	const handleClick = (e: React.MouseEvent, reviewId?: string) => {
		e.stopPropagation();

		closeModal();
		navigate(ROUTES.REVIEW.DETAIL(reviewId));
	};

	return (
		<Container onClick={e => handleClick(e, id)}>
			<Wrapper>
				<BookCoverImage
					src={book.cover}
					$width="100px"
					$boxShadow="2px 2px 4px rgba(0, 0, 0, 0.1)"
					$borderRadius="3px"
				/>
				<ReviewInfoTextBox>
					<ReviewTitle
						variant="list-title-sm"
						$color="#333"
						$marginBottom="3px"
						$lineClamp={1}
						$ellipsis
					>
						{title}
					</ReviewTitle>
					<ReviewRatingWithAuthor>
						<ReviewAuthorWithDate
							author={user?.nickname}
							date={createdAt}
							variantSize="sm"
						/>
						<ReviewRatingDisplay rating={rating} />
					</ReviewRatingWithAuthor>
					<ContentWrapper>
						<ReviewContent
							variant="list-body-md"
							$lineHeight={1.6}
							$ellipsis
							$lineClamp={2}
						>
							{stripHtmlTags(content)}
						</ReviewContent>
					</ContentWrapper>
					<ReviewTagList tags={tags} variantSize="sm" />
				</ReviewInfoTextBox>
			</Wrapper>
		</Container>
	);
}

export default ReviewSearchItem;
