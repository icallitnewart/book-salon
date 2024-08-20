import React from 'react';
import styled from 'styled-components';

import ReviewCompactListSection from '@features/review/components/organisms/ReviewCompactListSection';
import BookInfoSection from '../organisms/BookInfoSection';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

interface IBackgroundStyleProps {
	$flex?: string;
}

const Background = styled.div<IBackgroundStyleProps>`
	width: 100%;
	background-color: #f8f8f8;
	${({ $flex }) => $flex && `flex: ${$flex};`}

	box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

interface IWrapperStyleProps {
	$minHeight?: string;
	$height?: string;
}

const Wrapper = styled.div<IWrapperStyleProps>`
	display: flex;
	width: var(--desktop-screen-width);
	${({ $height }) => $height && `height: ${$height};`}
	${({ $minHeight }) => $minHeight && `min-height: ${$minHeight};`}
	margin: 0 auto;
`;

function BookDetailTemplate(): JSX.Element {
	return (
		<Container>
			<Wrapper $minHeight="600px">
				<BookInfoSection />
			</Wrapper>
			<Background $flex="1">
				<Wrapper $height="100%">
					<ReviewCompactListSection />
				</Wrapper>
			</Background>
		</Container>
	);
}

export default BookDetailTemplate;
