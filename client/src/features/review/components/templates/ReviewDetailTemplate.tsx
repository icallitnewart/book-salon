import React from 'react';

import ReviewPostSection from '../organisms/ReviewPostSection';
import ReviewBookProfileLayoutTemplate from './ReviewBookProfileLayoutTemplate';

function ReviewDetailTemplate(): JSX.Element {
	return (
		<ReviewBookProfileLayoutTemplate>
			<ReviewPostSection />
		</ReviewBookProfileLayoutTemplate>
	);
}

export default ReviewDetailTemplate;
