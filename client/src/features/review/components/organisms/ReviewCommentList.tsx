import React from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import useReviewCommentList from '@features/review/hooks/useReviewCommentList';

import withAsyncBoundary from '@components/organisms/withAsyncBoundary';
import { ParagraphWithStyles } from '@typographies';
import ReviewCommentItem from '../molecules/ReviewCommentItem';

const EmptyAlert = styled(ParagraphWithStyles)`
	padding: 10px;
`;

function ReviewCommentList(): JSX.Element {
	const { reviewId } = useParams();
	const { data: comments } = useReviewCommentList(reviewId);

	if (comments.length === 0) {
		return (
			<EmptyAlert variant="card-body-lg" $color="#666">
				아직 댓글이 없습니다. 리뷰에 대한 의견을 공유해주세요!
			</EmptyAlert>
		);
	}

	return (
		<>
			{comments.map(item => (
				<ReviewCommentItem
					key={item.id}
					id={item.id}
					author={item.user}
					createdAt={item.createdAt}
					content={item.content}
				/>
			))}
		</>
	);
}

export default withAsyncBoundary(ReviewCommentList);
