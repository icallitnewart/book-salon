import React from 'react';

import BookProfileLayoutTemplate from '@features/book/components/templates/BookProfileLayoutTemplate';
import ReviewAddSection from '../organisms/ReviewAddSection';

function ReviewAddTemplate(): JSX.Element {
	return (
		<BookProfileLayoutTemplate>
			<ReviewAddSection />
		</BookProfileLayoutTemplate>
	);
}

export default ReviewAddTemplate;
