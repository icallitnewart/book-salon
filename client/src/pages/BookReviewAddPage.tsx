import React from 'react';

import PageTemplate from '@components/templates/PageTemplate';
import BookReviewAddTemplate from '@features/review/components/templates/BookReviewAddTemplate';

function BookReviewAddPage(): JSX.Element {
	return (
		<PageTemplate>
			<BookReviewAddTemplate />
		</PageTemplate>
	);
}

export default BookReviewAddPage;
