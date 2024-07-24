import React from 'react';
import { styled } from 'styled-components';

import BookBestsellerSection from '@features/book/components/organisms/BookBestsellerSection';
import ReviewPopularCardList from '@features/review/components/organisms/ReviewPopularCardList';
import MainSectionLayout from '../organisms/MainSectionLayout';

const Container = styled.div`
	width: 100%;
`;

function MainTemplate(): JSX.Element {
	return (
		<Container>
			<BookBestsellerSection />
			<MainSectionLayout title="Popular reviews">
				<ReviewPopularCardList />
			</MainSectionLayout>
		</Container>
	);
}

export default MainTemplate;
