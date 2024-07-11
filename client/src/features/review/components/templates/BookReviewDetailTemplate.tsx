import React from 'react';
import styled from 'styled-components';

import BookProfileSideSection from '../organisms/BookProfileSideSection';
import BookReviewPostSection from '../organisms/BookReviewPostSection';

const Container = styled.div`
	display: flex;
	width: 100%;
`;

function BookReviewDetailTemplate(): JSX.Element {
	return (
		<Container>
			<BookProfileSideSection />
			<BookReviewPostSection />
		</Container>
	);
}

export default BookReviewDetailTemplate;
