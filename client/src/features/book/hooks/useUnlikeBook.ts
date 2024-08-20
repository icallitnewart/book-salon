import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@config/query/queryClient';

import { bookKeys } from '@config/query/queryKeys';

import bookApis from '../apis/bookApis';

function useUnlikeBook(isbn?: string) {
	const invalidateBookLikeQuery = () => {
		queryClient.invalidateQueries({ queryKey: bookKeys.checkLike(isbn) });
	};

	const removeLikedBookListQuery = () => {
		queryClient.removeQueries({ queryKey: bookKeys.likeList });
	};

	const mutation = useMutation({
		mutationKey: bookKeys.unlike(isbn),
		mutationFn: async () => {
			if (!isbn) {
				throw new Error('ISBN is required');
			}

			return bookApis.unlikeBook(isbn);
		},
		onSuccess: () => {
			invalidateBookLikeQuery();
			removeLikedBookListQuery();
		},
	});

	return {
		...mutation,
		unlikeBook: mutation.mutate,
	};
}

export default useUnlikeBook;
