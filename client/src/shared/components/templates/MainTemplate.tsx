import React from 'react';
import { styled } from 'styled-components';

import MainSection from '../organisms/MainSection';
import BestsellerBookCardList from '../../../features/book/components/organisms/BestsellerCardList';

const Container = styled.div`
	width: 100%;
`;

function MainTemplate(): JSX.Element {
	return (
		<Container>
			<MainSection title="This week's bestseller">
				<BestsellerBookCardList />
			</MainSection>
		</Container>
	);
}

export default MainTemplate;
