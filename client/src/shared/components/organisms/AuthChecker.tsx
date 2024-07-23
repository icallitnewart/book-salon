import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import { AUTH_TYPES } from '@constants/auth';
import useAuthQueryData from '@hooks/useAuthQueryData';

interface IAuthCheckerProps {
	children: JSX.Element;
	type: keyof typeof AUTH_TYPES;
}

function AuthChecker({ children, type }: IAuthCheckerProps): JSX.Element {
	const location = useLocation();
	const { getAuthQueryData } = useAuthQueryData();
	const { isAuth } = getAuthQueryData();

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
