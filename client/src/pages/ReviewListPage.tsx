import React from 'react';

import PageTemplate from '@components/templates/PageTemplate';
import ReviewListTemplate from '@features/review/components/templates/ReviewListTemplate';

function ReviewListPage(): JSX.Element {
	return (
		<PageTemplate>
			<ReviewListTemplate />
		</PageTemplate>
	);
}

export default ReviewListPage;
