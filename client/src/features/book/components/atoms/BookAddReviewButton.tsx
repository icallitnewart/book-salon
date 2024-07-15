import React from 'react';

import TextButton from '@buttons/TextButton';

function BookAddReviewButton(): JSX.Element {
	return (
		<TextButton variant="green" $width="120px">
			리뷰 작성
		</TextButton>
	);
}

export default BookAddReviewButton;
