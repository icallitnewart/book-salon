import React from 'react';

import { ReactComponent as StarFullIcon } from '@assets/svg/star_full.svg';
import { ReactComponent as StarHalfIcon } from '@assets/svg/star_half.svg';
import { ReactComponent as StarEmptyIcon } from '@assets/svg/star_empty.svg';

interface IReviewRatingStarProps {
	index: number;
	score: number;
}

function ReviewRatingStar({
	index,
	score,
}: IReviewRatingStarProps): JSX.Element {
	const isFullStar = score >= index;
	const isHalfStar = score >= index - 0.5 && score < index;

	if (isFullStar) return <StarFullIcon />;
	if (isHalfStar) return <StarHalfIcon />;
	return <StarEmptyIcon />;
}

export default ReviewRatingStar;
