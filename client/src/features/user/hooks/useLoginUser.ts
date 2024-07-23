import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@config/query/queryClient';
import { userKeys } from '@config/query/queryKeys';
import { IUserInfo, IUserLogin } from '../types/userData';
import userApis from '../apis/userApis';

function useLoginUser() {
	const mutation = useMutation({
		mutationKey: userKeys.login,
		mutationFn: (credentials: IUserLogin) => userApis.login(credentials),
	});

	const setLoginQueryData = (user: IUserInfo) => {
		return queryClient.setQueryData(userKeys.auth, {
			user,
			isAuth: true,
		});
	};

	return {
		...mutation,
		loginUser: mutation.mutate,
		setLoginQueryData,
	};
}

export default useLoginUser;
