import { useSuspenseQuery } from '@tanstack/react-query';

import { queryClient } from '@config/query/queryClient';
import { bookKeys } from '@config/query/queryKeys';

import { IBookData, IBookDetail } from '../types/bookData';

import bookApis from '../apis/bookApis';
import { refineBookData } from '../utils/bookDataHandler';

function useBestsellerList() {
	const getNextUpdateTime = () => {
		const now = new Date();
		const nextMonday = new Date(now);
		nextMonday.setDate(now.getDate() + ((1 + 7 - now.getDay()) % 7));
		nextMonday.setHours(0, 0, 0, 0);
		const nextUpdateTime = nextMonday.getTime() - now.getTime();

		return nextUpdateTime;
	};

	return useSuspenseQuery({
		queryKey: bookKeys.bestseller,
		queryFn: async () => {
			const books = await bookApis.getBestsellerList();
			const refinedBooks = books.reduce(
				(acc: IBookDetail[], data: IBookData) => {
					const book = refineBookData(data);
					queryClient.setQueryData(bookKeys.detail(book.isbn), book);
					acc.push(book);
					return acc;
				},
				[],
			);

			return refinedBooks;
		},
		staleTime: getNextUpdateTime(),
		gcTime: getNextUpdateTime(),
	});
}

export default useBestsellerList;
