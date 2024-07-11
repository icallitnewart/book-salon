import React from 'react';
import { styled } from 'styled-components';

import { Paragraph, Span } from '@typographies/TextElements';
import PostCommentButtonBox from './PostCommentButtonBox';

const Container = styled.div`
	padding: 10px;
`;

const Comment = styled(Paragraph)`
	width: 100%;
	padding: 20px;

	border-radius: 7px;
	background-color: #fbfbfb;
	border: 1px solid #eee;
	box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.05);
`;

const MetaInfo = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0px 5px;
	margin-bottom: 5px;
`;

interface IComment {
	nickname: string;
	date: string;
	comment: string;
}

function PostCommentItem({ nickname, date, comment }: IComment): JSX.Element {
	return (
		<Container>
			<MetaInfo>
				<Span variant="highlight-meta-lg">{nickname}</Span>
				<Span variant="card-meta-lg">{date}</Span>
			</MetaInfo>
			<Comment
				variant="card-body-lg"
				$lineHeight={1.6}
				$textAlign="justify"
				$marginBottom="10px"
				$color="#555"
				$fontWeight={400}
			>
				{comment}
			</Comment>
			<PostCommentButtonBox />
		</Container>
	);
}

export default PostCommentItem;
