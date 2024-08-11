import React from 'react';
import { styled } from 'styled-components';

import { IBookDetailPartial } from '@features/book/types/bookData';

import { formatISODate } from '@utils/dateFormatter';

import Divider from '@components/atoms/Divider';
import {
	Heading1 as BookInfoTitle,
	Paragraph as BookInfoCategory,
} from '@typographies';
import BookInfoTextWithLabel from '../molecules/BookInfoTextWithLabel';

const Container = styled.div`
	width: 100%;
`;

const BookInfoDescription = styled(BookInfoTextWithLabel).attrs({
	labelWidth: '120px',
	margin: '10px 0px',
	variantSize: 'lg',
})``;

function BookInfoTextBox({
	title,
	author,
	category,
	publisher,
	pubDate,
	isbn,
	description,
}: IBookDetailPartial): JSX.Element {
	return (
		<Container>
			<BookInfoCategory variant="article-meta-lg" $marginBottom="5px">
				{category?.replaceAll('>', ' > ')}
			</BookInfoCategory>
			<BookInfoTitle
				variant="article-title-md"
				$letterSpacing={1}
				$lineHeight={1.5}
			>
				{title}
			</BookInfoTitle>
			<Divider $margin="15px 0px 10px" />
			<BookInfoDescription label="저자" text={author} />
			<BookInfoDescription label="출판사" text={publisher} />
			<BookInfoDescription
				label="출판일자"
				text={pubDate && formatISODate(pubDate, false)}
			/>
			<BookInfoDescription label="ISBN" text={isbn} />
			<BookInfoDescription label="설명" text={description} />
		</Container>
	);
}

export default BookInfoTextBox;
