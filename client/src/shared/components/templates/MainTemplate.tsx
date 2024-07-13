import React from 'react';
import { styled } from 'styled-components';

import BestsellerBookCardList from '@features/book/components/organisms/BestsellerCardList';
import ReviewPopularCardList from '@features/review/components/organisms/ReviewPopularCardList';
import MainSection from '../organisms/MainSection';

const Container = styled.div`
	width: 100%;
`;

function MainTemplate(): JSX.Element {
	return (
		<Container>
			<MainSection title="This week's bestseller">
				<BestsellerBookCardList />
			</MainSection>
			<MainSection title="Popular reviews">
				<ReviewPopularCardList />
			</MainSection>
		</Container>
	);
}

export default MainTemplate;
