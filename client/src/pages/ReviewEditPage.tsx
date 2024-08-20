import React from 'react';
import { useParams } from 'react-router-dom';

import useUpdateReview from '@features/review/hooks/useUpdateReview';
import useReviewDetail from '@features/review/hooks/useReviewDetail';

import PageTemplate from '@components/templates/PageTemplate';
import ReviewFormTemplate from '@features/review/components/templates/ReviewFormTemplate';

function ReviewEditPage(): JSX.Element {
	const { reviewId } = useParams();
	const { updateReview } = useUpdateReview(reviewId);
	const { data } = useReviewDetail(reviewId);

	return (
		<PageTemplate>
			<ReviewFormTemplate<true>
				isEditMode
				submitMutation={updateReview}
				initialData={data}
			/>
		</PageTemplate>
	);
}

export default ReviewEditPage;
