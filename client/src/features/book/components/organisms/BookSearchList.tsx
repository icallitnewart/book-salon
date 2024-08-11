import React from 'react';
import { styled } from 'styled-components';

import { IBookDetail } from '@features/book/types/bookData';

import useBestsellerList from '@features/book/hooks/useBestsellerList';

import BookSearchItem from '../molecules/BookSearchItem';

const Container = styled.ul`
	width: 100%;
	height: calc(100% - 30px);
	overflow-y: auto;

	&::-webkit-scrollbar {
		width: 9px;
	}

	&::-webkit-scrollbar-track {
		background: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background-color: #ddd;
		border-radius: 20px;
		border: 4px solid transparent;
		border-left: 2px;
		background-clip: content-box;
	}
`;

interface IBookSearchListProps {
	closeModal: () => void;
}

function BookSearchList({ closeModal }: IBookSearchListProps): JSX.Element {
	// TODO: 제거 예정 (테스트용)
	const { data: books } = useBestsellerList();

	return (
		<Container>
			{books &&
				books.map((book: IBookDetail) => (
					<BookSearchItem
						key={book.isbn}
						cover={book.cover}
						title={book.title}
						author={book.author}
						publisher={book.publisher}
						pubDate={book.pubDate}
						isbn={book.isbn}
						closeModal={closeModal}
					/>
				))}
		</Container>
	);
}

export default BookSearchList;
