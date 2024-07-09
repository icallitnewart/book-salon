import React from 'react';
import styled from 'styled-components';

import BookReviewSection from '@features/review/components/organisms/BookReviewSection';
import BookInfoSection from '../organisms/BookInfoSection';

const Container = styled.div`
	width: 100%;
`;

const Background = styled.div`
	width: 100%;
	height: 100%;
	background-color: #f8f8f8;

	box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.1);
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
			</Wrapper>
			<Background>
				<Wrapper>
					<BookReviewSection />
				</Wrapper>
			</Background>
		</Container>
	);
}

export default BookDetailTemplate;
