import React from 'react';

import PageTemplate from '@components/templates/PageTemplate';
import BookDetailTemplate from '@features/book/components/templates/BookDetailTemplate';

function BookDetailPage(): JSX.Element {
	return (
		<PageTemplate $width="100%">
			<BookDetailTemplate />
		</PageTemplate>
	);
}

export default BookDetailPage;
