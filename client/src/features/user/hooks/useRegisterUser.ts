import { useMutation } from '@tanstack/react-query';

import { userKeys } from '@config/query/queryKeys';
import { IUserRegister } from '../types/userData';
import userApis from '../apis/userApis';

function useRegisterUser() {
	const mutation = useMutation({
		mutationKey: userKeys.register,
		mutationFn: (credentials: IUserRegister) => userApis.register(credentials),
	});

	return {
		...mutation,
		registerUser: mutation.mutate,
	};
}

export default useRegisterUser;
