import React from 'react';
import { styled } from 'styled-components';

import BookBestsellerCardList from '@features/book/components/organisms/BookBestsellerCardList';
import ReviewPopularSection from '@features/review/components/organisms/ReviewPopularSection';
import MainSectionLayout from '../organisms/MainSectionLayout';

const Container = styled.div`
	width: 100%;
`;

function MainTemplate(): JSX.Element {
	return (
		<Container>
			<MainSectionLayout title="This week's bestseller">
				<BookBestsellerCardList />
			</MainSectionLayout>
			<MainSectionLayout title="Popular reviews">
				<ReviewPopularSection />
			</MainSectionLayout>
		</Container>
	);
}

export default MainTemplate;
