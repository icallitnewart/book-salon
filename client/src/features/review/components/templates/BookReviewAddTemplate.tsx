import React from 'react';

import BookProfileLayoutTemplate from './BookProfileLayoutTemplate';
import BookReviewAddSection from '../organisms/BookReviewAddSection';

function BookReviewAddTemplate(): JSX.Element {
	return (
		<BookProfileLayoutTemplate>
			<BookReviewAddSection />
		</BookProfileLayoutTemplate>
	);
}

export default BookReviewAddTemplate;
