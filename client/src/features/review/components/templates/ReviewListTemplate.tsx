import React, { useState } from 'react';
import styled from 'styled-components';

import { SortTypes } from '@config/query/queryKeys';

import ReviewListSection from '../organisms/ReviewListSection';
import ReviewListSortTab from '../molecules/ReviewListSortTab';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 50px 0px 30px;
`;

function ReviewListTemplate(): JSX.Element {
	const [sortOption, setSortOption] = useState(SortTypes.LATEST);

	return (
		<Container>
			<ReviewListSortTab
				sortOption={sortOption}
				switchSortOption={setSortOption}
			/>
			<ReviewListSection />
		</Container>
	);
}

export default ReviewListTemplate;
