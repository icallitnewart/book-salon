import React from 'react';
import styled from 'styled-components';

import { Paragraph } from '@typographies/TextElements';
import PostCommentTextAreaBox from '../molecules/PostCommentTextAreaBox';
import PostCommentList from './PostCommentList';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 20px;
`;

function PostCommentBox(): JSX.Element {
	return (
		<Container>
			<Paragraph variant="article-title-sm" $lineHeight={1.8} $margin="6px 8px">
				댓글 0
			</Paragraph>
			<PostCommentList />
			<PostCommentTextAreaBox />
		</Container>
	);
}

export default PostCommentBox;
