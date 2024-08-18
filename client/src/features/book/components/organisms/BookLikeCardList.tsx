import React from 'react';
import { styled } from 'styled-components';

import { ROUTES } from '@constants/routes';

import useBookDetail from '@features/book/hooks/useBookDetail';

import BookCardItem from '../molecules/BookCardItem';

const Container = styled.div`
	display: flex;
	gap: 0px 50px;
	flex-wrap: wrap;
	width: 100%;
	padding: 20px;
`;

function BookLikeCardList(): JSX.Element {
	const { data, isPending } = useBookDetail('9791130646381');
	if (!data || isPending) return <div>Loading...</div>;

	return (
		<Container>
			{new Array(20).fill(data).map(book => (
				<BookCardItem
					key={book.isbn}
					title={book.title}
					author={book.author}
					cover={book.cover}
					link={ROUTES.BOOK.DETAIL(book.isbn)}
				/>
			))}
		</Container>
	);
}

export default BookLikeCardList;
