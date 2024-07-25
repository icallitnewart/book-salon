import React from 'react';
import { styled } from 'styled-components';

import BookBestsellerCardList from '@features/book/components/organisms/BookBestsellerCardList';
import ReviewPopularCardList from '@features/review/components/organisms/ReviewPopularCardList';
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
				<ReviewPopularCardList />
			</MainSectionLayout>
		</Container>
	);
}

export default MainTemplate;
