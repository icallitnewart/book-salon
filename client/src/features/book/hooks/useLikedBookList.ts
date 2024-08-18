import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { bookKeys } from '@config/query/queryKeys';

import { IPageOptions } from '@typeDefs/data';

import bookApis from '../apis/bookApis';

interface IUseLikedBookListProps {
	pagination?: IPageOptions;
}

function useLikedBookList({ pagination }: IUseLikedBookListProps) {
	const query = useSuspenseInfiniteQuery({
		queryKey: bookKeys.likeList,
		queryFn: ({ pageParam = 1 }) => {
			return bookApis.getLikedBookList({
				...pagination,
				page: pageParam as unknown as number,
				pageGroupSize: 1,
			});
		},
		initialPageParam: 1,
		getNextPageParam: ({ pageInfo }) => {
			const { hasNextPage, lastPage } = pageInfo;
			return hasNextPage ? lastPage + 1 : undefined;
		},
	});

	return {
		...query,
		books: query.data?.pages.flatMap(page => page.books),
	};
}

export default useLikedBookList;
