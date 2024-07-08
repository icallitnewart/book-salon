import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../redux/store';

import { ROUTES } from '../../constants/routes';
import { AUTH_TYPES } from '../../constants/auth';

interface IAuthProps {
	children: JSX.Element;
	type: keyof typeof AUTH_TYPES;
}

function AuthChecker({ children, type }: IAuthProps): JSX.Element {
	const location = useLocation();
	const isAuth = useAppSelector(state => state.user.isAuth);

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
