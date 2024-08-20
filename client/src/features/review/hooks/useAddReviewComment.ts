import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@config/query/queryClient';

import { reviewKeys } from '@config/query/queryKeys';
import reviewApis from '../apis/reviewApis';

import { IReviewCommentForm } from '../types/reviewCommentData';
import { IReviewDetail } from '../types/reviewData';

function useAddReviewComment(reviewId?: string) {
	const mutation = useMutation({
		mutationKey: reviewKeys.addComment(reviewId),
		mutationFn: async (formData: IReviewCommentForm) => {
			if (!reviewId) {
				throw new Error('Invalid ReviewId');
			}

			return reviewApis.addReviewComment(formData, reviewId);
		},
	});

	const invalidateCommentListQuery = () => {
		queryClient.invalidateQueries({
			queryKey: reviewKeys.commentList(reviewId),
		});
	};

	const increaseCommentCountInReviewQuery = (commentCount: number) => {
		queryClient.setQueryData(
			reviewKeys.detail(reviewId),
			(prevData: IReviewDetail) => ({ ...prevData, commentCount }),
		);
	};

	const initialiseQueryAfterMutation = (commentCount: number) => {
		invalidateCommentListQuery();
		increaseCommentCountInReviewQuery(commentCount);
	};

	return {
		...mutation,
		addReviewComment: mutation.mutate,
		initialiseQueryAfterMutation,
	};
}

export default useAddReviewComment;
