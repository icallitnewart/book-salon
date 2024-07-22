import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import { AUTH_TYPES } from '@constants/auth';
import { queryClient } from '@config/query/queryClient';
import { userKeys } from '@config/query/queryKeys';
import { IAuthQueryData } from '@features/user/types/userQueryData';

interface IAuthCheckerProps {
	children: JSX.Element;
	type: keyof typeof AUTH_TYPES;
}

function AuthChecker({ children, type }: IAuthCheckerProps): JSX.Element {
	const location = useLocation();
	const authData = queryClient.getQueryData<IAuthQueryData>(userKeys.auth);
	const isAuth = authData?.isAuth;

	if (type === AUTH_TYPES.PRIVATE && !isAuth) {
		return (
			<Navigate to={ROUTES.USER.LOGIN} state={{ from: location }} replace />
		);
	}

	if (type === AUTH_TYPES.GUEST && isAuth) {
		return <Navigate to={ROUTES.MAIN} replace />;
	}

	return children;
}

export default AuthChecker;
