import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@config/query/queryClient';
import { reviewKeys } from '@config/query/queryKeys';

import { IReviewCommentForm } from '../types/reviewCommentData';
import reviewApis from '../apis/reviewApis';

function useUpdateReviewComment(commentId?: string, reviewId?: string) {
	const mutation = useMutation({
		mutationKey: reviewKeys.updateComment(commentId),
		mutationFn: async (formData: IReviewCommentForm) => {
			if (!commentId) {
				throw new Error('Invalid commentId');
			}

			return reviewApis.updateReviewComment(formData, commentId);
		},
	});

	const initialiseCommentListQuery = () => {
		queryClient.invalidateQueries({
			queryKey: reviewKeys.commentList(reviewId),
		});
	};

	const initialiseQueryAfterMutation = () => {
		initialiseCommentListQuery();
	};

	return {
		mutation,
		updateReviewComment: mutation.mutate,
		initialiseQueryAfterMutation,
	};
}

export default useUpdateReviewComment;
