import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { queryKeys } from '@config/query/queryKeys';
import { IErrorResponse } from '@typeDefs/apiError';
import { handleApiError } from '@utils/errorHandler';
import { IUserLogin } from '../types/userData';
import { userApis } from '../apis/userApis';

const userKeys = queryKeys.users;

export const useLoginUser = () => {
	const [loginError, setLoginError] = useState<IErrorResponse | null>(null);
	const mutation = useMutation({
		mutationKey: userKeys.login,
		mutationFn: (credentials: IUserLogin) => userApis.login(credentials),
		onError: (err: unknown) => {
			const error = handleApiError(err);

			if (error.status === 500) alert(error.message);
			else setLoginError(error);
		},
	});

	return {
		...mutation,
		loginError,
	};
};
