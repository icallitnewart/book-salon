import { useQuery } from '@tanstack/react-query';
import { bookKeys } from '@config/query/queryKeys';
import bookApis from '../apis/bookApis';

function useCheckBookLike(isbn?: string, isAuth?: boolean) {
	return useQuery({
		queryKey: bookKeys.checkLike(isbn),
		queryFn: async () => {
			if (!isbn) {
				throw new Error('Invalid ISBN');
			}

			return bookApis.checkLike(isbn);
		},
		enabled: !!isbn && !!isAuth,
	});
}

export default useCheckBookLike;
