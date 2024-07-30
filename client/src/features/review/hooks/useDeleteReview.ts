import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@config/query/queryClient';
import { reviewKeys } from '@config/query/queryKeys';
import reviewApis from '../apis/reviewApis';

function useDeleteReview(reviewId?: string) {
	const mutation = useMutation({
		mutationKey: reviewKeys.delete(reviewId),
		mutationFn: async () => {
			if (!reviewId) {
				throw new Error('Invalid ReviewId');
			}

			return reviewApis.deleteReview(reviewId);
		},
		onSuccess: () => {
			queryClient.removeQueries({
				queryKey: reviewKeys.detail(reviewId),
			});
		},
	});

	return {
		...mutation,
		deleteReview: mutation.mutate,
	};
}

export default useDeleteReview;
