import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import { AUTH_TYPES } from '@constants/auth';

import useDelayedLoading from '@features/user/hooks/useDelayedLoading';
import useAuthUser from '@features/user/hooks/useAuthUser';

import Loader from '@components/molecules/Loader';

interface IAuthCheckerProps {
	children: JSX.Element;
	type: keyof typeof AUTH_TYPES;
}

function AuthChecker({ children, type }: IAuthCheckerProps): JSX.Element {
	const location = useLocation();
	const { data: auth, isPending, isError, isFetchedAfterMount } = useAuthUser();
	const isAuth = auth?.isAuth;
	const isLoading = isFetchedAfterMount ? isPending : null;
	const showLoader = useDelayedLoading(
		isLoading === null ? true : isLoading,
		1000,
	);

	useEffect(() => {
		if (isError) alert('인증 정보를 확인하는 데 문제가 발생했습니다.');
	}, [isError]);

	if (isLoading || isLoading === null) {
		if (showLoader) {
			return <Loader />;
		}

		return <div />;
	}

	// Page Access Control
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
