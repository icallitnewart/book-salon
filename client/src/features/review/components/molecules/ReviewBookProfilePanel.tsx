import React from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

import { IBookInfo } from '@features/book/types/bookDetail';

import { Heading2 as BookTitle } from '@typographies/TextElements';
import BookCoverWithBackground from '@features/book/components/molecules/BookCoverWithBackground';
import BookInfoTextWithLabel from '@features/book/components/molecules/BookInfoTextWithLabel';

const Container = styled.div`
	position: sticky;
	top: 130px; // TODO: 변수화 (Header 높이 + 30px)
	width: 100%;
	height: 500px;
`;

const BookInfoTextBox = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const BookInfoDescription = styled(BookInfoTextWithLabel).attrs({
	variantType: 'card',
	variantSize: 'md',
	labelWidth: '65px',
	margin: '4px 0px',
})``;

const sample: IBookInfo = {
	title:
		'물고기는 존재하지 않는다 - 상실, 사랑 그리고 숨어 있는 삶의 질서에 관한 이야기',
	author: '룰루 밀러 (지은이), 정지인 (옮긴이)',
	cover:
		'https://image.aladin.co.kr/product/28465/73/cover200/k092835920_2.jpg',
	category: '국내도서 > 과학 > 기초과학/교양과학',
	publisher: '곰출판',
	pubDate: '2021-12-17',
};

function ReviewBookProfilePanel(): JSX.Element {
	return (
		<Container>
			<Link to="/">
				<BookCoverWithBackground
					src={sample.cover}
					alt={sample.title}
					$width="100%"
					$imgWidth="45%"
				/>
			</Link>
			<BookInfoTextBox>
				<Link to="/">
					<BookTitle
						variant="card-title-lg"
						$margin="15px 0 7px"
						$lineHeight={1.8}
					>
						{sample.title}
					</BookTitle>
				</Link>
				<BookInfoDescription label="저자" text={sample.author} />
				<BookInfoDescription label="카테고리" text={sample.category} />
				<BookInfoDescription label="출판사" text={sample.publisher} />
				<BookInfoDescription label="출판일" text={sample.pubDate} />
			</BookInfoTextBox>
		</Container>
	);
}

export default ReviewBookProfilePanel;
