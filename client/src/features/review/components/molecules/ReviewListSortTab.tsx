import React from 'react';
import styled from 'styled-components';

import { SortTypes } from '@config/query/queryKeys';

import ReviewSortButton from '../atoms/ReviewSortButton';

const Container = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	margin-bottom: 25px;
`;

interface IReviewListSortTabProps {
	sortOption: SortTypes;
	switchSortOption: (sortOption: SortTypes) => void;
}

function ReviewListSortTab({
	sortOption,
	switchSortOption,
}: IReviewListSortTabProps): JSX.Element {
	return (
		<Container>
			{Object.values(SortTypes).map(type => (
				<ReviewSortButton
					key={type}
					type={type}
					sortOption={sortOption}
					switchSortOption={switchSortOption}
				/>
			))}
		</Container>
	);
}

export default ReviewListSortTab;
