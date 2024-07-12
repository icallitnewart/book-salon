import React from 'react';

import BookReviewPostSection from '../organisms/BookReviewPostSection';
import BookProfileLayoutTemplate from './BookProfileLayoutTemplate';

function BookReviewDetailTemplate(): JSX.Element {
	return (
		<BookProfileLayoutTemplate>
			<BookReviewPostSection />
		</BookProfileLayoutTemplate>
	);
}

export default BookReviewDetailTemplate;
