import React from 'react';

import PageTemplate from '@components/templates/PageTemplate';
import ReviewFormTemplate from '@features/review/components/templates/ReviewFormTemplate';
import useAddReview from '@features/review/hooks/useAddReview';

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

export default ReviewAddPage;
