import React, { useMemo } from 'react';
import { styled } from 'styled-components';
import { Link, useParams } from 'react-router-dom';

import { IBookProfile } from '@features/book/types/bookProfile';
import { ROUTES } from '@constants/routes';

import useBookDetail from '@features/book/hooks/useBookDetail';

import withAsyncBoundary from '@components/organisms/withAsyncBoundary';
import { Heading2 as BookTitle } from '@typographies';
import BookCoverWithBackground from '@features/book/components/molecules/BookCoverWithBackground';
import BookInfoTextWithLabel from '@features/book/components/molecules/BookInfoTextWithLabel';

const Container = styled.div`
	position: sticky;
	top: 130px; // TODO: 변수화 (Header 높이 + 30px)
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

interface IBookProfilePanelProps {
	dbBook?: IBookProfile;
}

function BookProfilePanel({ dbBook }: IBookProfilePanelProps): JSX.Element {
	const { isbn } = useParams();
	const { data: fetchedBook, isPending } = useBookDetail(
		dbBook?.isbn ? undefined : isbn,
	);
	const book = useMemo(() => dbBook ?? fetchedBook, [dbBook, fetchedBook]);

	if (!dbBook && isPending) {
		// TODO: Skeleton UI로 대체
		return <div>Loading...</div>;
	}

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

export default withAsyncBoundary(BookProfilePanel, {
	SuspenseFallback: null,
});
