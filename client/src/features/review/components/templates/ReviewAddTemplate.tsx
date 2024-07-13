import React from 'react';

import ReviewBookProfileLayoutTemplate from './ReviewBookProfileLayoutTemplate';
import ReviewAddSection from '../organisms/ReviewAddSection';

function ReviewAddTemplate(): JSX.Element {
	return (
		<ReviewBookProfileLayoutTemplate>
			<ReviewAddSection />
		</ReviewBookProfileLayoutTemplate>
	);
}

export default ReviewAddTemplate;
