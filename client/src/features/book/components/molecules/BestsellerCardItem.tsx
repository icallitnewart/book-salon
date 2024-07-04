import React from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

import BookTitle from '../atoms/BookTitle';
import BookAuthor from '../atoms/BookAuthor';
import BookCover from '../atoms/BookCover';

const LinkContainer = styled(Link)`
	display: block;
	width: 100%;
	height: 100%;
	width: calc(100% / 6);
	max-width: 134px;
	height: 300px;
`;

const Article = styled.article`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	cursor: pointer;
`;

interface IBestsellerCardProps {
	title: string;
	author: string;
	cover: string;
	link: string;
}

function BestsellerCardItem({
	title,
	author,
	cover,
	link,
}: IBestsellerCardProps): JSX.Element {
	return (
		<LinkContainer to={link}>
			<Article>
				<BookCover src={cover} alt={`${title} 도서 이미지`} />
				<BookTitle>{title}</BookTitle>
				<BookAuthor>{author}</BookAuthor>
			</Article>
		</LinkContainer>
	);
}

export default BestsellerCardItem;
