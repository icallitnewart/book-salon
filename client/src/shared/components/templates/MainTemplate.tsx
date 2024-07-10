import React from 'react';
import { styled } from 'styled-components';

import BestsellerBookCardList from '@features/book/components/organisms/BestsellerCardList';
import PopularReviewCardList from '@features/review/components/organisms/PopularReviewCardList';
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
				<PopularReviewCardList />
			</MainSection>
		</Container>
	);
}

export default MainTemplate;
