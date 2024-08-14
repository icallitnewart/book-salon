import React from 'react';
import { styled } from 'styled-components';
import { useParams } from 'react-router-dom';
import { SortTypes } from '@config/query/queryKeys';

import useReviewList from '@features/review/hooks/useReviewList';

import SectionTitleWithHighlight from '@components/molecules/SectionTitleWithHighlight';
import MoreButtonBox from '@components/molecules/MoreButtonBox';
import ReviewCompactCardList from './ReviewCompactCardList';

const Container = styled.section`
	width: 100%;
	padding: 50px 0px;
`;

function ReviewListSection(): JSX.Element {
	const { isbn } = useParams();
	const { data: reviews, isPending } = useReviewList(
		{
			filters: { isbn },
			sort: { type: SortTypes.MOST_VIEWED },
			pagination: { page: 1, perPage: 6, pageGroupSize: 1 },
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
			{reviews && reviews.length > 0 && <MoreButtonBox />}
		</Container>
	);
}

export default ReviewListSection;
