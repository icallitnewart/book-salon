import { useCallback } from 'react';
import { bookKeys } from '@config/query/queryKeys';
import { queryClient } from '@config/query/queryClient';

import { IBookDetail } from '../types/bookData';

function useBookQueryData() {
	const getBookDetailQueryData = useCallback((isbn?: string) => {
		return queryClient.getQueryData<IBookDetail>(bookKeys.detail(isbn));
	}, []);

	const setBookDetailQueryData = useCallback(
		(data: IBookDetail, isbn: string) => {
			queryClient.setQueryData(bookKeys.detail(isbn), data);
		},
		[],
	);

	return {
		getBookDetailQueryData,
		setBookDetailQueryData,
	};
}

export default useBookQueryData;
