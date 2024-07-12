import React from 'react';
import { styled } from 'styled-components';

import {
	Heading3 as Title,
	Paragraph as Content,
	Span,
} from '@components/atoms/Typographies/TextElements';
import Divider from '@components/atoms/Divider';
import PostTagBox from './PostTagBox';
import EditDeleteButtonBox from './EditDeleteButtonBox';

const Container = styled.div`
	width: 100%;
	min-height: 400px;
	padding: 10px 0px;
	margin-bottom: 20px;
`;

const MetaInfo = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin-bottom: 20px;
`;

const data = {
	title: `[리뷰] 물고기는 존재하지 않는다 질서에 관한 이야기 - 상실, 사랑 그리고
				숨어 있는 삶의 질서에 관한 이야기`,
	date: '2024년 03월 05일',
	tags: [
		{ id: 1, text: '물고기' },
		{ id: 2, text: '진실' },
	],
	content: `물고기는 존재하지 않는다는 루 밀러(Lulu Miller)가 쓴 흥미로운 논픽션
				작품입니다. 이 책은 19세기 말에서 20세기 초에 활동한 분류학자 데이비드
				스타 조던의 삶을 탐구하면서, 동시에 저자 자신의 개인적인 이야기를
				엮어냅니다. 밀러는 조던의 삶과 업적을 통해 과학의 본질, 인간의 욕망,
				그리고 우리가 세상을 이해하려는 노력에 대해 깊이 있게 고찰합니다. 이
				책은 단순한 전기나 과학 서적을 넘어섭니다. 밀러는 자신의 개인적인 경험과
				조던의 이야기를 교묘하게 엮어, 독자로 하여금 삶의 의미와 질서에 대해
				생각해보게 만듭니다. 특히 책 제목에서 암시하듯, 우리가 당연하게 여기는
				것들이 실제로는 우리의 인식과 분류 체계에 의해 만들어진 것일 수 있다는
				점을 제시합니다. 이를 통해 밀러는 독자들에게 세상을 바라보는 새로운
				시각을 제공하며, 불확실성과 혼돈 속에서도 의미를 찾을 수 있다는 희망적인
				메시지를 전달합니다.`,
};

function BookReviewPost(): JSX.Element {
	return (
		<Container>
			<Title variant="article-title-lg" $lineHeight={1.8} $textAlign="justify">
				{data.title}
			</Title>
			<Divider $margin="13px 0px" />
			<MetaInfo>
				<PostTagBox tags={data.tags} />
				<Span
					variant="article-meta-lg"
					$lineHeight={1.8}
					$textAlign="right"
					$color="#888"
				>
					{data.date}
				</Span>
			</MetaInfo>
			<Content variant="article-body-lg" $lineHeight={1.8} $textAlign="justify">
				{data.content}
			</Content>
			<EditDeleteButtonBox variantType="article" variantSize="lg" />
		</Container>
	);
}

export default BookReviewPost;
