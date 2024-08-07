import React from 'react';
import { useParams } from 'react-router-dom';

import useReviewDetail from '@features/review/hooks/useReviewDetail';

import { Paragraph as TotalComment } from '@typographies';

function ReviewTotalComment() {
	const { reviewId } = useParams();
	const { data: review } = useReviewDetail(reviewId);

	return (
		<TotalComment
			variant="article-title-sm"
			$lineHeight={1.8}
			$margin="6px 8px"
		>
			댓글 {review?.commentCount || 0}
		</TotalComment>
	);
}

export default ReviewTotalComment;
