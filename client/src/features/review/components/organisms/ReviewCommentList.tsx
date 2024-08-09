import React from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import useReviewCommentList from '@features/review/hooks/useReviewCommentList';

import withAsyncBoundary from '@components/organisms/withAsyncBoundary';
import { ParagraphWithStyles } from '@typographies';
import ReviewCommentItem from '../molecules/ReviewCommentItem';

const Container = styled.div`
	width: 100%;
	min-height: 84px;
	padding: 20px;
	margin-bottom: 30px;

	background-color: #f9f8f7;
	border: 1px solid #f5f4f3;
	border-radius: 7px;
`;

const EmptyAlert = styled(ParagraphWithStyles)`
	padding: 10px;
`;

function ReviewCommentList(): JSX.Element {
	const { reviewId } = useParams();
	const { data: comments, isPending } = useReviewCommentList(reviewId);

	if (isPending || !comments) {
		return <p>Loading..</p>;
	}

	return (
		<Container>
			{comments.length > 0 ? (
				comments.map(item => (
					<ReviewCommentItem
						key={item.id}
						id={item.id}
						author={item.user}
						createdAt={item.createdAt}
						content={item.content}
					/>
				))
			) : (
				<EmptyAlert variant="card-body-lg" $color="#666">
					아직 댓글이 없습니다. 리뷰에 대한 의견을 공유해주세요!
				</EmptyAlert>
			)}
		</Container>
	);
}

export default withAsyncBoundary(ReviewCommentList, {
	SuspenseFallback: null,
});
