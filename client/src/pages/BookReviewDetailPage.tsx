import React from 'react';

import PageTemplate from '@components/templates/PageTemplate';
import BookReviewDetailTemplate from '@features/review/components/templates/BookReviewDetailTemplate';

function BookReviewDetailPage(): JSX.Element {
	return (
		<PageTemplate>
			<BookReviewDetailTemplate />
		</PageTemplate>
	);
}

export default BookReviewDetailPage;
