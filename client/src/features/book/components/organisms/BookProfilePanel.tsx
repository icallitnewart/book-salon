import React from 'react';
import { styled } from 'styled-components';
import { Link, useParams } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import { IBookDetail } from '@features/book/types/bookData';

import useBookDetail from '@features/book/hooks/useBookDetail';
import useReviewDetail from '@features/review/hooks/useReviewDetail';

import withAsyncBoundary from '@components/organisms/withAsyncBoundary';
import Loader from '@components/molecules/Loader';
import { Heading2 as BookTitle } from '@typographies';
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

function BookProfileDetail({ book }: { book?: IBookDetail }): JSX.Element {
	return (
		<Container>
			<Link to={ROUTES.BOOK.DETAIL(book?.isbn)}>
				<BookCoverWithBackground
					src={book?.cover}
					alt={book?.title}
					$width="100%"
					$imgWidth="45%"
				/>
			</Link>
			<BookInfoTextBox>
				<Link to={ROUTES.BOOK.DETAIL(book?.isbn)}>
					<BookTitle
						variant="card-title-lg"
						$margin="15px 0 7px"
						$lineHeight={1.8}
					>
						{book?.title}
					</BookTitle>
				</Link>
				<BookInfoDescription label="저자" text={book?.author} />
				<BookInfoDescription label="카테고리" text={book?.category} />
				<BookInfoDescription label="출판사" text={book?.publisher} />
				<BookInfoDescription label="출판일" text={book?.pubDate} />
			</BookInfoTextBox>
		</Container>
	);
}

function DBBookProfile({ reviewId }: { reviewId: string }): JSX.Element {
	const { data: review } = useReviewDetail(reviewId);
	return <BookProfileDetail book={review?.book} />;
}

function FetchedBookProfile({ isbn }: { isbn: string }): JSX.Element {
	const { data: book } = useBookDetail(isbn);
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

	// TODO: Skeleton UI로 대체
	return <Loader />;
}

export default withAsyncBoundary(BookProfilePanel, {
	SuspenseFallback: null,
});
