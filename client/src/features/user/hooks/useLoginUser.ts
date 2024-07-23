import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@config/query/queryClient';
import { userKeys } from '@config/query/queryKeys';
import useAuthQueryData from '@hooks/useAuthQueryData';
import { IUserInfo, IUserLogin } from '../types/userData';
import userApis from '../apis/userApis';

function useLoginUser() {
	const { setAuthQueryData } = useAuthQueryData();
	const mutation = useMutation({
		mutationKey: userKeys.login,
		mutationFn: (credentials: IUserLogin) => userApis.login(credentials),
	});

	const updateAuthQueryDataAfterMutation = (user: IUserInfo) => {
		setAuthQueryData({
			user,
			isAuth: true,
		});
	};

	return {
		...mutation,
		loginUser: mutation.mutate,
		updateAuthQueryDataAfterMutation,
	};
}

export default useLoginUser;
