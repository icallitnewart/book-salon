import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

import { Heading2, Paragraph } from '@typographies/TextElements';
import BookCoverImage from '../atoms/BookCoverImage';

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

const BookTitle = styled(Heading2)`
	text-align: center;
`;

const BookAuthor = styled(Paragraph)`
	text-align: center;
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
				<BookCoverImage
					src={cover}
					alt={`${title} 도서 이미지`}
					$height="200px"
					$boxShadow="0 0 10px rgba(0, 0, 0, 0.15)"
				/>
				<BookTitle
					variant="card-title-md"
					$margin="13px 0 8px"
					$ellipsis
					$lineClamp={2}
				>
					{title}
				</BookTitle>
				<BookAuthor variant="card-subtitle-md" $ellipsis $lineClamp={2}>
					{author.split(/ \(지은이\)| \(엮은이\)/)[0]}
				</BookAuthor>
			</Article>
		</LinkContainer>
	);
}

export default BestsellerCardItem;
