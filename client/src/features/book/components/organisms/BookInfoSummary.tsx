import React from 'react';
import { styled } from 'styled-components';

import { IBookInfo } from '@features/book/types/bookDetail';

import BookInfoTextBox from '../molecules/BookInfoTextBox';
import BookInfoButtons from '../molecules/BookInfoButtons';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex: 1;
	padding: 10px 10px 0px 50px;
`;

function BookInfoSummary({
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
			<BookInfoTextBox
				title={title}
				author={author}
				category={category}
				publisher={publisher}
				pubDate={pubDate}
				isbn={isbn}
				description={description}
			/>
			<BookInfoButtons />
		</Container>
	);
}

export default BookInfoSummary;
