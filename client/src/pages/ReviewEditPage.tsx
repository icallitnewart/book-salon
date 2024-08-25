import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

import useUpdateReview from '@features/review/hooks/useUpdateReview';
import useReviewDetail from '@features/review/hooks/useReviewDetail';

import PageTemplate from '@components/templates/PageTemplate';
import ReviewFormTemplate from '@features/review/components/templates/ReviewFormTemplate';
import withAsyncBoundary from '@components/organisms/withAsyncBoundary';

function ReviewEditPage(): JSX.Element {
	const { reviewId } = useParams();
	const { updateReview, isPending } = useUpdateReview(reviewId);
	const { data } = useReviewDetail(reviewId);

	return (
		<PageTemplate>
			<ReviewFormTemplate<true>
				isEditMode
				submitMutation={updateReview}
				initialData={data}
				isPending={isPending}
			/>
		</PageTemplate>
	);
}

export default withAsyncBoundary(ReviewEditPage, {
	SuspenseFallback: null,
	// TODO: Error 페이지로 리다이렉트
	ErrorFallback: () => <Navigate to=".." replace />,
});
