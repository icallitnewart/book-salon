import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { queryClient } from '@config/query/queryClient';

import { IReviewListOptions, reviewKeys } from '@config/query/queryKeys';
import { IReviewList } from '../types/reviewData';
import reviewApis from '../apis/reviewApis';

type UseReviewListOptions<TData = IReviewList> = Omit<
	UseQueryOptions<IReviewList, Error, TData>,
	'queryKey' | 'queryFn'
>;

function useReviewList<TData = IReviewList>(
	{ filters, sort, pagination }: IReviewListOptions,
	options?: UseReviewListOptions<TData>,
) {
	return useQuery<IReviewList, Error, TData>({
		queryKey: reviewKeys.list({ filters, sort, pagination }),
		queryFn: async () => {
			const data = await reviewApis.getReviewList({
				filters,
				sort,
				pagination,
			});

			data.reviews.forEach(review => {
				queryClient.setQueryData(reviewKeys.detail(review.id), review);
			});

			return data;
		},
		throwOnError: true,
		...options,
	});
}

export default useReviewList;
