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
	const { data: book, isPending } = useBookDetail(isbn);

	if (isPending) {
		// TODO: 각 컴포넌트에 전달하여 Skeleton UI로 대체
		return <Container>Loading...</Container>;
	}

	return (
		<Container>
			<BookCoverWithBackground src={book?.cover} alt={book?.title} />
			<BookInfoContent
				title={book?.title}
				author={book?.author}
				category={book?.categoryName}
				publisher={book?.publisher}
				pubDate={book?.pubDate}
				isbn={book?.isbn13}
				description={book?.description}
			/>
		</Container>
	);
}

export default withAsyncBoundary(BookInfoSection, {
	SuspenseFallback: null,
});
