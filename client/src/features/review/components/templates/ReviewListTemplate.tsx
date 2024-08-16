import React, { useState } from 'react';
import styled from 'styled-components';
import { useQueryClient } from '@tanstack/react-query';

import { reviewKeys, SortTypes } from '@config/query/queryKeys';

import ReviewListSection from '../organisms/ReviewListSection';
import ReviewListSortTab from '../molecules/ReviewListSortTab';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 50px 0px 30px;
`;

function ReviewListTemplate(): JSX.Element {
	const queryClient = useQueryClient();
	const [sortOption, setSortOption] = useState(SortTypes.LATEST);

	const switchSortOption = (newSortOption: SortTypes) => {
		setSortOption(newSortOption);
		queryClient.resetQueries({
			queryKey: reviewKeys.list({
				sort: { type: newSortOption },
			}),
		});
	};

	return (
		<Container>
			<ReviewListSortTab
				sortOption={sortOption}
				switchSortOption={switchSortOption}
			/>
			<ReviewListSection sortOption={sortOption} />
		</Container>
	);
}

export default ReviewListTemplate;
