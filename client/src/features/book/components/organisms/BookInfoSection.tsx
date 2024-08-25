import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import useBookDetail from '@features/book/hooks/useBookDetail';

import withAsyncBoundary from '@components/organisms/withAsyncBoundary';
import BookCoverWithBackground from '../molecules/BookCoverWithBackground';
import BookInfoContent from './BookInfoContent';

const Container = styled.section`
	display: flex;
	width: 100%;
	padding: 50px 0px;
`;

function BookInfoSection(): JSX.Element {
	const { isbn } = useParams();
	const { data: book } = useBookDetail(isbn);

	if (!book) {
		return <BookInfoSection.Skeleton />;
	}

	return (
		<Container>
			<BookCoverWithBackground src={book.cover} alt={book.title} />
			<BookInfoContent
				title={book.title}
				author={book.author}
				category={book.category}
				publisher={book.publisher}
				pubDate={book.pubDate}
				isbn={book.isbn}
				description={book.description}
			/>
		</Container>
	);
}

BookInfoSection.Skeleton = function (): JSX.Element {
	return (
		<Container>
			<BookCoverWithBackground $imgWidth="200px" $imgHeight="300px" />
			<BookInfoContent.Skeleton />
		</Container>
	);
};

export default withAsyncBoundary(BookInfoSection, {
	SuspenseFallback: null,
});
