import { useQuery } from '@tanstack/react-query';
import { reviewKeys } from '@config/query/queryKeys';

import { TIME_MS } from '@constants/time';
import reviewApis from '../apis/reviewApis';

function useReviewCommentList(reviewId?: string) {
	return useQuery({
		queryKey: reviewKeys.commentList(reviewId),
		queryFn: async () => {
			if (!reviewId) {
				throw new Error('Invalid ReviewId');
			}

			return reviewApis.getReviewCommentList(reviewId);
		},
		enabled: !!reviewId,
		staleTime: TIME_MS.MINUTE,
		gcTime: TIME_MS.MINUTE * 3,
		throwOnError: true,
	});
}

export default useReviewCommentList;
