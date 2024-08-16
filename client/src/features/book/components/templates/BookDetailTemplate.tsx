import React from 'react';
import styled from 'styled-components';

import ReviewCompactListSection from '@features/review/components/organisms/ReviewCompactListSection';
import BookInfoSection from '../organisms/BookInfoSection';

const Container = styled.div`
	width: 100%;
`;

const Background = styled.div`
	width: 100%;
	background-color: #f8f8f8;

	box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

interface IWrapperStyleProps {
	$minHeight?: string;
}

const Wrapper = styled.div<IWrapperStyleProps>`
	width: var(--desktop-screen-width);
	${({ $minHeight }) => `min-height: ${$minHeight};`}
	margin: 0 auto;
`;

function BookDetailTemplate(): JSX.Element {
	return (
		<Container>
			<Wrapper $minHeight="600px">
				<BookInfoSection />
			</Wrapper>
			<Background>
				<Wrapper>
					<ReviewCompactListSection />
				</Wrapper>
			</Background>
		</Container>
	);
}

export default BookDetailTemplate;
