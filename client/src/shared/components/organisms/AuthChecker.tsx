import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import { AUTH_TYPES } from '@constants/auth';

import useAuthUser from '@features/user/hooks/useAuthUser';

interface IAuthCheckerProps {
	children: JSX.Element;
	type: keyof typeof AUTH_TYPES;
}

function AuthChecker({ children, type }: IAuthCheckerProps): JSX.Element {
	const location = useLocation();
	const { data: isAuth } = useAuthUser({
		select: data => data.isAuth,
	});

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
