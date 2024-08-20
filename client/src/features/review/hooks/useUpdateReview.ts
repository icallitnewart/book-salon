import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@config/query/queryClient';

import { reviewKeys } from '@config/query/queryKeys';
import reviewApis from '../apis/reviewApis';

import { IReviewForm } from '../types/reviewData';

function useUpdateReview(reviewId?: string) {
	const mutation = useMutation({
		mutationKey: reviewKeys.update(reviewId),
		mutationFn: async (formData: IReviewForm) => {
			if (!reviewId) {
				throw new Error('Invalid reviewId');
			}

			return reviewApis.updateReview(formData, reviewId);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: reviewKeys.detail(reviewId),
			});
		},
	});

	return {
		...mutation,
		updateReview: mutation.mutate,
	};
}

export default useUpdateReview;
