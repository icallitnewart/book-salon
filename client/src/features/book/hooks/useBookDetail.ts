import { useQuery } from '@tanstack/react-query';

import { bookKeys } from '@config/query/queryKeys';
import { TIME_MS } from '@constants/time';
import bookApis from '../apis/bookApis';
import { refineBookData } from '../utils/bookDataHandler';

function useBookDetail(isbn?: string) {
	return useQuery({
		queryKey: bookKeys.detail(isbn),
		queryFn: async ({ queryKey }) => {
			const [, , isbnNum] = queryKey;
			if (!isbnNum || isbnNum.length !== 13) {
				// TODO: 추후 에러 처리 방법 수정
				throw new Error('Invalid ISBN');
			}

			const book = await bookApis.getBookDetail(isbnNum);
			return refineBookData(book);
		},
		staleTime: TIME_MS.DAY * 3,
		gcTime: TIME_MS.WEEK,
		enabled: !!isbn,
		throwOnError: true,
		retry: false,
	});
}

export default useBookDetail;
