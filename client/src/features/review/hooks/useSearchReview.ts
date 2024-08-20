import { useInfiniteQuery } from '@tanstack/react-query';
import { reviewKeys } from '@config/query/queryKeys';

import { IPageOptions } from '@typeDefs/data';
import { TIME_MS } from '@constants/time';
import reviewApis from '../apis/reviewApis';

function useSearchReview(searchTerm?: string, pagination?: IPageOptions) {
	return useInfiniteQuery({
		queryKey: reviewKeys.search(searchTerm),
		queryFn: async ({ pageParam = 1 }) => {
			if (!searchTerm) {
				throw new Error('Invalid search term');
			}

			const pageOptions = {
				...pagination,
				page: pageParam,
				pageGroupSize: 1,
			};

			return reviewApis.searchReviews(searchTerm, pageOptions);
		},
		staleTime: TIME_MS.SECOND * 10,
		gcTime: TIME_MS.SECOND * 30,
		initialPageParam: 1,
		getNextPageParam: ({ pageInfo }) => {
			const { hasNextPage, lastPage } = pageInfo;
			return hasNextPage ? lastPage + 1 : undefined;
		},
		enabled: !!searchTerm,
		throwOnError: true,
	});
}

export default useSearchReview;
