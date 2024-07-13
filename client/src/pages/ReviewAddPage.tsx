import React from 'react';

import PageTemplate from '@components/templates/PageTemplate';
import ReviewAddTemplate from '@features/review/components/templates/ReviewAddTemplate';

function ReviewAddPage(): JSX.Element {
	return (
		<PageTemplate>
			<ReviewAddTemplate />
		</PageTemplate>
	);
}

export default ReviewAddPage;
