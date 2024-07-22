import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '@redux/store';

import { queryClient } from '@config/query/queryClient';
import { userKeys } from '@config/query/queryKeys';
import { handleApiError } from '@utils/errorHandler';

import { ROUTES } from '@constants/routes';
import { IErrorResponse } from '@typeDefs/apiError';
import { IUserLogin } from '../types/userData';
import userApis from '../apis/userApis';
import { updateAuth } from '../userSlice';

function useLoginUser() {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const [loginError, setLoginError] = useState<IErrorResponse | null>(null);

	const navigateAfterLogin = () => {
		const from = location.state?.from;
		if (from && from.pathname !== ROUTES.USER.LOGIN) {
			navigate(from.pathname, { replace: true });
		} else {
			navigate(ROUTES.MAIN, { replace: true });
		}
	};

	const mutation = useMutation({
		mutationKey: userKeys.login,
		mutationFn: (credentials: IUserLogin) => userApis.login(credentials),
		onSuccess: user => {
			// TODO: dispatch 제거 예정
			dispatch(updateAuth(user));
			queryClient.setQueryData(userKeys.auth, {
				user,
				isAuth: true,
			});
			alert('로그인에 성공하셨습니다.');
			navigateAfterLogin();
		},
		onError: err => {
			const error = handleApiError(err);

			if (error.status === 500) alert(error.message);
			else setLoginError(error);
		},
	});

	return {
		...mutation,
		loginError,
	};
}

export default useLoginUser;
