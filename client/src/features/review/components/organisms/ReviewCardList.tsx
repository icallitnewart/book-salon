import React from 'react';
import { styled } from 'styled-components';

import { IBookReview } from '@features/review/types/bookReview';

import ReviewCardItem from '../molecules/ReviewCardItem';

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: 20px;
	width: 100%;
`;

const sample: IBookReview = {
	id: 1,
	title: '상실, 사랑 그리고 숨어 있는 삶의 질서에 관한 이야기',
	nickname: 'icallitnewart',
	content:
		'집착에 가까울 만큼 자연계에 질서를 부여하려 했던 19세기 어느 과학자의 삶을 흥미롭게 좇아가는 이 책은 어느 순간 독자들을 혼돈의 한복판으로 데려가서 우리가 믿고 있던 삶의 질서에 관해 한 가지 의문을 제기한다. “물고기가 존재하지 않는다는 것은 엄연한 하나의 사실이다.',
	date: '2023년 7월 1일',
};

function ReviewCardList(): JSX.Element {
	const data = new Array(6).fill(sample);

	return (
		<Container>
			{data.map(item => (
				<ReviewCardItem
					key={item.id}
					id={item.id}
					nickname={item.nickname}
					title={item.title}
					content={item.content}
					date={item.date}
				/>
			))}
		</Container>
	);
}

export default ReviewCardList;
