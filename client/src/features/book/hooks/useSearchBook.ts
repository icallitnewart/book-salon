import { useInfiniteQuery } from '@tanstack/react-query';

import { bookKeys } from '@config/query/queryKeys';
import { TIME_MS } from '@constants/time';
import bookApis from '../apis/bookApis';

const DEFAULT_PAGE_OPTIONS = { maxResults: 5, startPage: 1 };

function useSearchBook(searchTerm?: string, pagination = DEFAULT_PAGE_OPTIONS) {
	return useInfiniteQuery({
		queryKey: bookKeys.search(searchTerm),
		queryFn: async ({ pageParam = 1 }) => {
			if (!searchTerm) {
				throw new Error('Invalid search term');
			}

			const pageOptions = {
				...pagination,
				startPage: pageParam,
			};

			return bookApis.searchBooks(searchTerm, pageOptions);
		},
		staleTime: TIME_MS.SECOND * 10,
		gcTime: TIME_MS.SECOND * 30,
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			const { maxResults } = pagination;

			if (lastPage.length < maxResults) {
				return undefined;
			}
			return allPages.length + 1;
		},
		enabled: !!searchTerm,
		throwOnError: true,
	});
}

export default useSearchBook;
