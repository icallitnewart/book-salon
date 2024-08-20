import React from 'react';

import PageTemplate from '@components/templates/PageTemplate';
import ReviewDetailTemplate from '@features/review/components/templates/ReviewDetailTemplate';

function ReviewDetailPage(): JSX.Element {
	return (
		<PageTemplate>
			<ReviewDetailTemplate />
		</PageTemplate>
	);
}

export default ReviewDetailPage;
