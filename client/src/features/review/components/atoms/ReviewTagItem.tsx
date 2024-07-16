import React from 'react';

import { TagText } from '@typographies';

interface IReviewTagProps {
	children: string;
	variantSize?: 'sm' | 'md' | 'lg';
}

function ReviewTagItem({
	children,
	variantSize,
}: IReviewTagProps): JSX.Element {
	return <TagText variantSize={variantSize}>{children}</TagText>;
}

export default ReviewTagItem;
