import React from 'react';
import { Navigate } from 'react-router-dom';

import useAddReview from '@features/review/hooks/useAddReview';

import PageTemplate from '@components/templates/PageTemplate';
import ReviewFormTemplate from '@features/review/components/templates/ReviewFormTemplate';
import withAsyncBoundary from '@components/organisms/withAsyncBoundary';

function ReviewAddPage(): JSX.Element {
	const { addReview, isPending } = useAddReview();

	return (
		<PageTemplate>
			<ReviewFormTemplate<false>
				isEditMode={false}
				submitMutation={addReview}
				isPending={isPending}
			/>
		</PageTemplate>
	);
}

export default withAsyncBoundary(ReviewAddPage, {
	SuspenseFallback: null,
	// TODO: Error 페이지로 리다이렉트
	ErrorFallback: () => <Navigate to=".." replace />,
});
