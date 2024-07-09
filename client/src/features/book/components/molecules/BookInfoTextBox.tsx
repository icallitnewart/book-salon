import React from 'react';
import { styled } from 'styled-components';

import { IBookInfo } from '@features/book/types/bookDetail';

import Divider from '@components/atoms/Divider';
import {
	Heading1 as BookInfoTitle,
	Paragraph as BookInfoCategory,
} from '@typographies/TextElements';
import BookInfoDescription from './BookInfoDescription';

const Container = styled.div`
	width: 100%;
`;

function BookInfoTextBox({
	title,
	author,
	category,
	publisher,
	pubDate,
	isbn,
	description,
}: IBookInfo): JSX.Element {
	return (
		<Container>
			<BookInfoCategory variant="article-meta-md" $marginBottom="5px">
				{category?.replaceAll('>', ' > ')}
			</BookInfoCategory>
			<BookInfoTitle
				variant="article-title-md"
				$letterSpacing={1}
				$lineHeight={1.7}
			>
				{title}
			</BookInfoTitle>
			<Divider $margin="15px 0px 10px" />
			<BookInfoDescription field="저자" text={author} />
			<BookInfoDescription field="출판사" text={publisher} />
			<BookInfoDescription field="출판일자" text={pubDate} />
			<BookInfoDescription field="ISBN" text={isbn} />
			<BookInfoDescription field="설명" text={description} />
		</Container>
	);
}

export default BookInfoTextBox;
