import { useMutation } from '@tanstack/react-query';

import { userKeys } from '@config/query/queryKeys';
import useAuthQueryData from '@hooks/useAuthQueryData';
import userApis from '../apis/userApis';
import { IUserInfo, IUserUpdate } from '../types/userData';

function useUpdateUser() {
	const { setAuthQueryData } = useAuthQueryData();
	const mutation = useMutation({
		mutationKey: userKeys.update,
		mutationFn: (formData: IUserUpdate) => userApis.update(formData),
	});

	const updateAuthQueryDataAfterMutation = (user: IUserInfo) => {
		setAuthQueryData({
			user,
			isAuth: true,
		});
	};

	return {
		...mutation,
		updateUser: mutation.mutate,
		updateAuthQueryDataAfterMutation,
	};
}

export default useUpdateUser;
