import React from 'react';
import { styled } from 'styled-components';
import { Link, Navigate, useParams } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import { IBookDetail } from '@features/book/types/bookData';

import useBookDetail from '@features/book/hooks/useBookDetail';
import useReviewDetail from '@features/review/hooks/useReviewDetail';

import { Heading2 as BookTitle } from '@typographies';
import Skeleton from '@components/atoms/Skeleton';
import BookCoverWithBackground from '../molecules/BookCoverWithBackground';
import BookInfoTextWithLabel from '../molecules/BookInfoTextWithLabel';

const Container = styled.div`
	position: sticky;
	top: calc(var(--header-height) + 30px);
	width: 100%;
	height: 500px;
`;

const BookInfoTextBox = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const BookInfoDescription = styled(BookInfoTextWithLabel).attrs({
	variantType: 'card',
	variantSize: 'md',
	labelWidth: '65px',
	margin: '4px 0px',
})``;

function BookProfileDetail({ book }: { book: IBookDetail }): JSX.Element {
	return (
		<Container>
			<Link to={ROUTES.BOOK.DETAIL(book.isbn)}>
				<BookCoverWithBackground
					src={book.cover}
					alt={book.title}
					$width="100%"
					$imgWidth="45%"
				/>
			</Link>
			<BookInfoTextBox>
				<Link to={ROUTES.BOOK.DETAIL(book.isbn)}>
					<BookTitle
						variant="card-title-lg"
						$margin="15px 0 7px"
						$lineHeight={1.8}
					>
						{book.title}
					</BookTitle>
				</Link>
				<BookInfoDescription label="저자" text={book.author} />
				<BookInfoDescription label="카테고리" text={book.category} />
				<BookInfoDescription label="출판사" text={book.publisher} />
				<BookInfoDescription label="출판일" text={book.pubDate} />
			</BookInfoTextBox>
		</Container>
	);
}

BookProfileDetail.Skeleton = function (): JSX.Element {
	return (
		<Container>
			<BookCoverWithBackground
				$width="100%"
				$imgWidth="135px"
				$imgHeight="201px"
			/>
			<BookInfoTextBox>
				<Skeleton
					width="100%"
					height={30}
					$marginBottom="15px"
					$marginTop="20px"
				/>
				<Skeleton width="100%" height={20} $marginBottom="10px" />
				<Skeleton width="100%" height={20} $marginBottom="10px" />
				<Skeleton width="100%" height={20} $marginBottom="10px" />
				<Skeleton width="100%" height={20} $marginBottom="10px" />
			</BookInfoTextBox>
		</Container>
	);
};

function DBBookProfile({ reviewId }: { reviewId: string }): JSX.Element {
	const { data: review } = useReviewDetail(reviewId);

	if (!review || !review.book) {
		return <BookProfileDetail.Skeleton />;
	}

	return <BookProfileDetail book={review.book} />;
}

function FetchedBookProfile({ isbn }: { isbn: string }): JSX.Element {
	const { data: book } = useBookDetail(isbn);

	if (!book) {
		return <BookProfileDetail.Skeleton />;
	}

	return <BookProfileDetail book={book} />;
}

function BookProfilePanel(): JSX.Element {
	const { isbn, reviewId } = useParams<{ isbn?: string; reviewId?: string }>();

	if (reviewId) {
		return <DBBookProfile reviewId={reviewId} />;
	}

	if (isbn) {
		return <FetchedBookProfile isbn={isbn} />;
	}

	// TODO: Error 페이지로 리다이렉트
	return <Navigate to=".." replace />;
}

export default BookProfilePanel;
