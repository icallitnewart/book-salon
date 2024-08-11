import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { IReviewPreview } from '@features/review/types/reviewData';
import { IBookDetail } from '@features/book/types/bookData';
import { ROUTES } from '@constants/routes';

import { stripHtmlTags } from '@utils/dataTransform';

import BookCoverImage from '@features/book/components/atoms/BookCoverImage';
import { Heading3, Paragraph } from '@typographies';

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

const Content = styled.div`
	flex: 1;
`;

interface IReviewSearchItemProps extends IReviewPreview {
	book: IBookDetail;
	closeModal: () => void;
}

function ReviewSearchItem({
	id,
	title,
	content,
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
					<Heading3
						variant="list-title-sm"
						$color="#333"
						$marginBottom="5px"
						$lineClamp={2}
						$ellipsis
					>
						{title}
					</Heading3>
					<Content>
						<Paragraph
							variant="list-body-md"
							$lineHeight={1.7}
							$ellipsis
							$lineClamp={3}
						>
							{stripHtmlTags(content)}
						</Paragraph>
					</Content>
				</ReviewInfoTextBox>
			</Wrapper>
		</Container>
	);
}

export default ReviewSearchItem;
