import React from 'react';
import { styled } from 'styled-components';

import { IBookDetailPartial } from '@features/book/types/bookData';

import { formatISODate } from '@utils/dateFormatter';

import { Heading2 as BookInfoTitle } from '@typographies';
import BookInfoTextWithLabel from '../molecules/BookInfoTextWithLabel';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	width: 100%;
	height: 100%;
	padding: 15px 0px 15px 30px;
`;

const BookInfoTitleBox = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-end;
	min-height: 35px;
`;

const BookInfoDescription = styled(BookInfoTextWithLabel).attrs({
	labelWidth: '80px',
	variantSize: 'sm',
})``;

function BookInfoTextBoxCompact({
	title,
	author,
	publisher,
	pubDate,
	isbn,
}: IBookDetailPartial): JSX.Element {
	return (
		<Container>
			<BookInfoTitleBox>
				<BookInfoTitle
					variant="list-title-sm"
					$marginBottom="7px"
					$lineHeight={1.5}
					$lineClamp={2}
					$ellipsis
				>
					{title}
				</BookInfoTitle>
			</BookInfoTitleBox>
			<BookInfoDescription label="저자" text={author} />
			<BookInfoDescription label="출판사" text={publisher} />
			<BookInfoDescription
				label="출판일자"
				text={pubDate && formatISODate(pubDate, false)}
			/>
			<BookInfoDescription label="ISBN" text={isbn} />
		</Container>
	);
}

export default BookInfoTextBoxCompact;
