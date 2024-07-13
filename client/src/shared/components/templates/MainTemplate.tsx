import React from 'react';
import { styled } from 'styled-components';

import BookBestsellerCardList from '@features/book/components/organisms/BookBestsellerCardList';
import ReviewPopularCardList from '@features/review/components/organisms/ReviewPopularCardList';
import MainSection from '../organisms/MainSection';

const Container = styled.div`
	width: 100%;
`;

function MainTemplate(): JSX.Element {
	return (
		<Container>
			<MainSection title="This week's bestseller">
				<BookBestsellerCardList />
			</MainSection>
			<MainSection title="Popular reviews">
				<ReviewPopularCardList />
			</MainSection>
		</Container>
	);
}

export default MainTemplate;
