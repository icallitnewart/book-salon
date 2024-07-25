import React from 'react';

import BookProfileLayoutTemplate from '@features/book/components/templates/BookProfileLayoutTemplate';
import ReviewPostSection from '../organisms/ReviewPostSection';

function ReviewDetailTemplate(): JSX.Element {
	return (
		<BookProfileLayoutTemplate>
			<ReviewPostSection />
		</BookProfileLayoutTemplate>
	);
}

export default ReviewDetailTemplate;
