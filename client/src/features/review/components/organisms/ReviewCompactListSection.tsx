import React from 'react';
import { styled } from 'styled-components';
import { useParams } from 'react-router-dom';
import { SortTypes } from '@config/query/queryKeys';

import useReviewList from '@features/review/hooks/useReviewList';

import withAsyncBoundary from '@components/organisms/withAsyncBoundary';
import SectionTitleWithHighlight from '@components/molecules/SectionTitleWithHighlight';
import MoreButtonBox from '@components/molecules/MoreButtonBox';
import ReviewCompactCardList from './ReviewCompactCardList';

const Container = styled.section`
	width: 100%;
	height: 100%;
	padding: 50px 0px;
`;

function ReviewCompactListSection(): JSX.Element {
	const { isbn } = useParams();
	const { data: reviews, isPending } = useReviewList(
		{
			filters: { isbn },
			sort: { type: SortTypes.MOST_VIEWED },
			pagination: { page: 1, perPage: 100, pageGroupSize: 1 },
		},
		{
			select: data => data.reviews,
			enabled: !!isbn,
		},
	);

	return (
		<Container>
			<SectionTitleWithHighlight
				title="Reviews"
				variantSize="lg"
				$textAlign="center"
			/>
			<ReviewCompactCardList reviews={reviews} isPending={isPending} />
			{/* TODO: 더보기 버튼 수정 예정 */}
			{/* {data?.pageInfo.hasNextPage && <MoreButtonBox />} */}
		</Container>
	);
}

export default withAsyncBoundary(ReviewCompactListSection, {
	SuspenseFallback: null,
});
