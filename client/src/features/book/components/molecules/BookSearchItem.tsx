import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { IBookDetailPartial } from '@features/book/types/bookData';
import { ROUTES } from '@constants/routes';

import BookCoverImage from '../atoms/BookCoverImage';
import BookInfoTextBoxCompact from '../organisms/BookInfoTextBoxCompact';

const Container = styled.li`
	width: 100%;
	height: 180px;
	padding: 0px 10px;
	cursor: pointer;

	&:hover {
		background-color: #f6f7f8;
		/* rgba(0, 247, 153, 0.1); */
	}
`;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;
	padding: 0px 20px;

	border-bottom: 1px solid #e0e0e0;
`;

interface IBookSearchItemProps extends IBookDetailPartial {
	searchTerm: string;
	closeModal: () => void;
}

function BookSearchItem({
	cover,
	title,
	author,
	publisher,
	pubDate,
	isbn,
	searchTerm,
	closeModal,
}: IBookSearchItemProps): JSX.Element {
	const navigate = useNavigate();
	const handleClick = (e: React.MouseEvent, ISBN?: string) => {
		e.stopPropagation();

		closeModal();
		navigate(ROUTES.BOOK.DETAIL(ISBN));
	};

	return (
		<Container onClick={e => handleClick(e, isbn)}>
			<Wrapper>
				<BookCoverImage
					src={cover}
					$width="100px"
					$boxShadow="2px 2px 4px rgba(0, 0, 0, 0.1)"
					$borderRadius="3px"
				/>
				<BookInfoTextBoxCompact
					title={title}
					author={author}
					publisher={publisher}
					pubDate={pubDate}
					isbn={isbn}
					searchTerm={searchTerm}
				/>
			</Wrapper>
		</Container>
	);
}

export default BookSearchItem;
