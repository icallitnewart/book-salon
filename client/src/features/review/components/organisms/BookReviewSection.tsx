import React from 'react';
import { styled } from 'styled-components';

import SectionTitleWithHighlight from '@components/molecules/SectionTitleWithHighlight';
import MoreButtonBox from '@components/molecules/MoreButtonBox';
import BookReviewCardList from './BookReviewCardList';

const Container = styled.section`
	width: 100%;
	padding: 50px 0px;
`;

function BookReviewSection(): JSX.Element {
	return (
		<Container>
			<SectionTitleWithHighlight
				title="Reviews"
				$fontSize={3}
				$textAlign="center"
			/>
			<BookReviewCardList />
			<MoreButtonBox />
		</Container>
	);
}

export default BookReviewSection;
