import React from 'react';
import { styled } from 'styled-components';

import { IBookDetailPartial } from '../../types/bookData';

import BookInfoTextBox from './BookInfoTextBox';
import BookInfoButtons from '../molecules/BookInfoButtons';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex: 1;
	padding: 10px 10px 0px 50px;
`;

function BookInfoContent({
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

BookInfoContent.Skeleton = function (): JSX.Element {
	return (
		<Container>
			<BookInfoTextBox.Skeleton />
		</Container>
	);
};

export default BookInfoContent;
