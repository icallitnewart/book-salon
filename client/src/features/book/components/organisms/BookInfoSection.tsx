import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import BookCoverWithBackground from '../molecules/BookCoverWithBackground';
import BookInfoSummary from './BookInfoSummary';

const Container = styled.section`
	display: flex;
	width: 100%;
	padding: 50px 0px;
`;

interface IBookInfoData {
	title: string;
	author: string;
	cover: string;
	categoryName: string;
	isbn13: string;
	publisher: string;
	pubDate: string;
	description: string;
}

function BookInfoSection(): JSX.Element {
	const [bookInfo, setBookInfo] = useState<IBookInfoData | null>(null);
	const testFetch = async () => {
		const response = await axios.get(
			'http://localhost:5000/api/books/test/detail',
		);
		setBookInfo(response.data.data.item[0]);
	};

	useEffect(() => {
		testFetch();
	}, []);

	console.log(bookInfo);

	return (
		<Container>
			<BookCoverWithBackground src={bookInfo?.cover} alt={bookInfo?.title} />
			<BookInfoSummary
				title={bookInfo?.title}
				author={bookInfo?.author}
				category={bookInfo?.categoryName}
				publisher={bookInfo?.publisher}
				pubDate={bookInfo?.pubDate}
				isbn={bookInfo?.isbn13}
				description={bookInfo?.description}
			/>
		</Container>
	);
}

export default BookInfoSection;
