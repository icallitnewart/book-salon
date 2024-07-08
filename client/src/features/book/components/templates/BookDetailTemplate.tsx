import React from 'react';
import styled from 'styled-components';

import BookInfoSection from '../organisms/BookInfoSection';

const Container = styled.div`
	width: 100%;
	padding: 50px 0px;
	border-bottom: 1px solid #eee;
`;

const Wrapper = styled.div`
	width: var(--desktop-screen-width);
	margin: 0 auto;
`;

function BookDetailTemplate(): JSX.Element {
	return (
		<Container>
			<Wrapper>
				<BookInfoSection />
				{/* <BookReviewList /> */}
			</Wrapper>
		</Container>
	);
}

export default BookDetailTemplate;
