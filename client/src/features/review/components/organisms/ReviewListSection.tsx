import React, { useMemo } from 'react';
import styled from 'styled-components';

import { SortTypes } from '@config/query/queryKeys';

import useCalculatePerPage from '@hooks/useCalculatedPerPage';
import useReviewListInfinite from '../../hooks/useReviewListInfinite';

import ReviewCardList from './ReviewCardList';

const Container = styled.section`
	display: flex;
	flex-wrap: wrap;
	gap: 30px;
	width: 100%;
	margin-bottom: 70px;
`;

interface IReviewListSectionProps {
	sortOption: SortTypes;
}

function ReviewListSection({
	sortOption,
}: IReviewListSectionProps): JSX.Element {
	const perPage = useCalculatePerPage({
		itemHeight: 400,
		itemsPerRow: 3,
	});
	const { reviews, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useReviewListInfinite({
			sort: { type: sortOption },
			pagination: { perPage },
			isInfiniteEnabled: true,
		});

	return (
		<Container>
			<ReviewCardList
				reviews={reviews}
				fetchNextPage={fetchNextPage}
				hasNextPage={hasNextPage}
				isFetchingNextPage={isFetchingNextPage}
			/>
		</Container>
	);
}

export default ReviewListSection;
