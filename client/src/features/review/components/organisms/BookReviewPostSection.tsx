import React from 'react';
import styled from 'styled-components';

import BookReviewPost from '../molecules/BookReviewPost';
import PostCommentBox from './PostCommentBox';

const Container = styled.section`
	display: flex;
	flex-direction: column;
	flex: 1;
	padding: 30px 0px;
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
