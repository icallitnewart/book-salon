import { queryClient } from '@config/query/queryClient';
import { userKeys } from '@config/query/queryKeys';
import { IAuthQueryData } from '@features/user/types/userQueryData';
import { useCallback } from 'react';

function useAuthQueryData() {
	const getAuthQueryData = useCallback(() => {
		const authData = queryClient.getQueryData<IAuthQueryData>(userKeys.auth);
		return {
			user: authData?.user,
			isAuth: authData?.isAuth,
		};
	}, []);

	const setAuthQueryData = useCallback((data: IAuthQueryData) => {
		queryClient.setQueryData(userKeys.auth, data);
	}, []);

	return {
		getAuthQueryData,
		setAuthQueryData,
	};
}

export default useAuthQueryData;
