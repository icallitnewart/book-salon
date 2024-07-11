import React from 'react';
import styled from 'styled-components';

import PostCommentBox from './PostCommentBox';
import BookReviewPost from '../molecules/BookReviewPost';

const Container = styled.section`
	display: flex;
	flex-direction: column;
	flex: 1;
	padding: 30px 0px 30px 60px;
`;

function BookReviewPostSection(): JSX.Element {
	return (
		<Container>
			<BookReviewPost />
			<PostCommentBox />
		</Container>
	);
}

export default BookReviewPostSection;
