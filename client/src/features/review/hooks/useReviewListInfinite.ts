import { useInfiniteQuery } from '@tanstack/react-query';
import { queryClient } from '@config/query/queryClient';

import { IReviewListOptions, reviewKeys } from '@config/query/queryKeys';
import reviewApis from '../apis/reviewApis';

function useReviewListInfinite({
	filters,
	sort,
	pagination,
}: IReviewListOptions) {
	return useInfiniteQuery({
		queryKey: reviewKeys.list({ filters, sort, pagination }),
		queryFn: async ({ pageParam = 1 }) => {
			const data = await reviewApis.getReviewList({
				filters,
				sort,
				pagination: {
					...pagination,
					page: pageParam,
					pageGroupSize: 1,
				},
			});

			data.reviews.forEach(review => {
				queryClient.setQueryData(reviewKeys.detail(review.id), review);
			});

			return data;
		},
		initialPageParam: 1,
		getNextPageParam: ({ pageInfo }) => {
			const { hasNextPage, lastPage } = pageInfo;
			return hasNextPage ? lastPage + 1 : undefined;
		},
		throwOnError: true,
	});
}

export default useReviewListInfinite;
