import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@config/query/queryClient';

import { bookKeys } from '@config/query/queryKeys';
import { IBookDetail } from '../types/bookData';

import bookApis from '../apis/bookApis';

function useLikeBook(isbn?: string) {
	const invalidateBookLikeQuery = () => {
		queryClient.invalidateQueries({ queryKey: bookKeys.checkLike(isbn) });
	};

	const removeLikedBookListQuery = () => {
		queryClient.removeQueries({ queryKey: bookKeys.likeList });
	};

	const mutation = useMutation({
		mutationKey: bookKeys.like(isbn),
		mutationFn: (bookData: IBookDetail) => bookApis.likeBook(bookData),
		onSuccess: () => {
			invalidateBookLikeQuery();
			removeLikedBookListQuery();
		},
	});

	return {
		...mutation,
		likeBook: mutation.mutate,
	};
}

export default useLikeBook;
