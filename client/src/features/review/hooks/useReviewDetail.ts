import { useQuery } from '@tanstack/react-query';
import { reviewKeys } from '@config/query/queryKeys';

import reviewApis from '../apis/reviewApis';

function useReviewDetail(reviewId?: string) {
	return useQuery({
		queryKey: reviewKeys.detail(reviewId),
		queryFn: async ({ queryKey }) => {
			const [, , id] = queryKey;
			if (!id) {
				throw new Error('Invalid ReviewId');
			}

			return reviewApis.getReviewDetail(id);
		},
		enabled: !!reviewId,
		throwOnError: true,
	});
}

export default useReviewDetail;
