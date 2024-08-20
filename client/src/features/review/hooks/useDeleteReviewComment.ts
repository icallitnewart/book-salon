import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@config/query/queryClient';
import { reviewKeys } from '@config/query/queryKeys';

import reviewApis from '../apis/reviewApis';
import { IReviewDetail } from '../types/reviewData';

function useDeleteReviewComment(commentId?: string, reviewId?: string) {
	const mutation = useMutation({
		mutationKey: reviewKeys.deleteComment(commentId),
		mutationFn: async () => {
			if (!commentId) {
				throw new Error('Invalid commentId');
			}

			return reviewApis.deleteReviewComment(commentId);
		},
	});

	const initialiseCommentListQuery = () => {
		queryClient.invalidateQueries({
			queryKey: reviewKeys.commentList(reviewId),
		});
	};

	const updateCommentCountInReviewQuery = (commentCount: number) => {
		queryClient.setQueryData(
			reviewKeys.detail(reviewId),
			(prevData: IReviewDetail) => ({ ...prevData, commentCount }),
		);
	};

	const initaliseQueryAfterMutation = (commentCount: number) => {
		initialiseCommentListQuery();
		updateCommentCountInReviewQuery(commentCount);
	};

	return {
		...mutation,
		deleteReviewComment: mutation.mutate,
		initaliseQueryAfterMutation,
	};
}

export default useDeleteReviewComment;
