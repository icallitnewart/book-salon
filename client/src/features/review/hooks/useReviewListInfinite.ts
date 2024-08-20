import { useInfiniteQuery } from '@tanstack/react-query';
import { queryClient } from '@config/query/queryClient';

import { IReviewListOptions, reviewKeys } from '@config/query/queryKeys';
import { TIME_MS } from '@constants/time';

import reviewApis from '../apis/reviewApis';

function useReviewList({
	filters,
	sort,
	pagination,
	isInfiniteEnabled,
}: IReviewListOptions) {
	const query = useInfiniteQuery({
		queryKey: reviewKeys.list({ filters, sort }),
		queryFn: async ({ pageParam = 1 }) => {
			const data = await reviewApis.getReviewList({
				filters,
				sort,
				pagination: {
					...pagination,
					page: pageParam as unknown as number,
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
			if (!isInfiniteEnabled) return undefined;
			const { hasNextPage, lastPage } = pageInfo;
			return hasNextPage ? lastPage + 1 : undefined;
		},
		staleTime: 0,
		gcTime: TIME_MS.MINUTE,
		throwOnError: true,
	});

	return {
		...query,
		reviews: query.data?.pages.flatMap(page => page.reviews) || [],
	};
}

export default useReviewList;
