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

function ReviewListSection(): JSX.Element {
	const perPage = useCalculatePerPage({
		itemHeight: 400,
		itemsPerRow: 3,
	});
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useReviewListInfinite({
			sort: { type: SortTypes.LATEST },
			pagination: { perPage },
		});

	const reviews = useMemo(() => {
		return data?.pages.flatMap(page => page.reviews) || [];
	}, [data]);

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
