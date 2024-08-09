import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@config/query/queryClient';
import { reviewKeys } from '@config/query/queryKeys';

import reviewApis from '../apis/reviewApis';
import { IReviewDetail, IReviewViewCount } from '../types/reviewData';

function useUpdateReviewViewCount(reviewId?: string) {
	const mutation = useMutation({
		mutationKey: reviewKeys.updateViewCount(reviewId),
		mutationFn: async () => {
			if (!reviewId) {
				throw new Error('Invalid reviewId');
			}

			return reviewApis.updateReviewViewCount(reviewId);
		},
		onSuccess: ({ viewCount }: IReviewViewCount) => {
			queryClient.setQueryData(
				reviewKeys.detail(reviewId),
				(prevData: IReviewDetail) => ({ ...prevData, viewCount }),
			);
		},
		onError: () => {
			console.error('리뷰 조회수 업데이트에 실패했습니다.');
		},
	});

	return {
		...mutation,
		updateReviewViewCount: mutation.mutate,
	};
}

export default useUpdateReviewViewCount;
