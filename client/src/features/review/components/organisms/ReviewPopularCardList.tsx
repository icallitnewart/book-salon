import React from 'react';
import styled from 'styled-components';

import BookProfilePreview from '@features/book/components/molecules/BookProfilePreview';
import ReviewSummary from '../molecules/ReviewSummary';

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 30px 50px;
	justify-content: space-between;
	width: 100%;
`;

const ReviewPopularCardItem = styled.article`
	width: calc(100% / 2 - 25px);
	height: 220px;
	display: flex;
	gap: 20px;
`;

const sample = {
	title:
		'[리뷰] THE MONEY BOOK 더 머니북 - 잘 살아갈 우리를 위한 금융생활 안내서',
	nickname: '김책읽',
	content:
		'돈이 행복의 필수 조건이라고 여기면서도, 막상 돈을 잘 모르는 사람들. 《더 머니북》은 이 사람들을 위해 만들어졌다. 사용자들에게 자주 받아온 “금융교육은 어디서 받나요?”라는 질문에 토스가 내놓는 답이자, ‘누구나 편리하고 평등하게 금융하는 세상 만들기’라는 진심을 말하는 시작점이다. ‘누구나 편리하고 평등하게 금융하는 세상 만들기’라는 진심을 말하는 시작점이다.',
	link: '',
	book: {
		title: 'THE MONEY BOOK 더 머니북 - 잘 살아갈 우리를 위한 금융생활 안내서',
		author: '토스',
		cover:
			'https://image.aladin.co.kr/product/34009/78/cover200/k772931867_1.jpg',
	},
};

function ReviewPopularCardList(): JSX.Element {
	const data = new Array(6).fill(sample);
	return (
		<Container>
			{data.map(review => (
				<ReviewPopularCardItem>
					<BookProfilePreview
						title={review.book.title}
						cover={review.book.cover}
						link={review.link}
						$fontSize="xs"
						$imgBorderRadius="3px"
						$titleMargin="10px 0 0"
						$width="100px"
					/>
					<ReviewSummary
						title={review.title}
						content={review.content}
						nickname={review.nickname}
						link={review.link}
					/>
				</ReviewPopularCardItem>
			))}
		</Container>
	);
}

export default ReviewPopularCardList;
