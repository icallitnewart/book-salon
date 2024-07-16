import React from 'react';
import { styled } from 'styled-components';

import { ParagraphWithStyles } from '@typographies';
import ReviewCommentItem from '../molecules/ReviewCommentItem';

const Container = styled.div`
	width: 100%;
	min-height: 84px;
	padding: 20px;
	margin-bottom: 30px;

	background-color: #f9f8f7;
	border: 1px solid #f5f4f3;
	border-radius: 7px;
`;

const EmptyAlert = styled(ParagraphWithStyles)`
	padding: 10px;
`;

interface IComment {
	id?: number;
	nickname: string;
	date: string;
	comment: string;
}

const comments: IComment[] = [
	{
		id: 1,
		nickname: 'icallitnewart',
		date: '2024년 5월 9일',
		comment: `우리가 당연하게 여기는 것들에 대해 다시 생각해보게 만드는 책인 것
					같아요. 불확실한 세상에서 의미를 찾는다는 주제도 깊이 있어 보입니다.`,
	},
];

function ReviewCommentList(): JSX.Element {
	return (
		<Container>
			{comments.length > 0 ? (
				comments.map(item => (
					<ReviewCommentItem
						key={item.id}
						nickname={item.nickname}
						date={item.date}
						comment={item.comment}
					/>
				))
			) : (
				<EmptyAlert variant="card-body-lg" $color="#666">
					아직 댓글이 없습니다. 리뷰에 대한 의견을 공유해주세요!
				</EmptyAlert>
			)}
		</Container>
	);
}

export default ReviewCommentList;
