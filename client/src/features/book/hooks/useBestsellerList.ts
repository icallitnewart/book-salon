import { useSuspenseQuery } from '@tanstack/react-query';
import { bookKeys } from '@config/query/queryKeys';

import { IBookData, IBookDetail } from '../types/bookData';

import bookApis from '../apis/bookApis';
import { refineBookData } from '../utils/bookDataHandler';
import useBookQueryData from './useBookQueryData';

function useBestsellerList() {
	const { setBookDetailQueryData } = useBookQueryData();

	const getNextUpdateTime = () => {
		const now = new Date();
		const nextMonday = new Date(now);

		// 다음주 월요일까지 남은 시간 계산
		if (now.getDay() === 1) {
			// 오늘이 월요일인 경우
			nextMonday.setDate(now.getDate() + 7);
		} else {
			nextMonday.setDate(now.getDate() + ((1 + 7 - now.getDay()) % 7));
		}

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
					const book: IBookDetail = refineBookData(data);
					setBookDetailQueryData(book, book.isbn);
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
