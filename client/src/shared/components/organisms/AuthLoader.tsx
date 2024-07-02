import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/store';

import useDelayedLoading from '../../../features/user/hooks/useDelayedLoading';
import { getAuthUser } from '../../../features/user/apis/userApi';
import { clearGetAuthStatus } from '../../../features/user/userSlice';

interface IAuthLoaderProps {
	children: JSX.Element;
}

function AuthLoader({ children }: IAuthLoaderProps): JSX.Element {
	const dispatch = useAppDispatch();
	const loading = useAppSelector(state => state.user.getAuthStatus.loading);
	const error = useAppSelector(state => state.user.getAuthStatus.error);
	const showLoader = useDelayedLoading(loading === null ? true : loading, 1000);

	useEffect(() => {
		dispatch(getAuthUser());
	}, [dispatch]);

	useEffect(() => {
		if (error) {
			alert('인증 정보를 확인하는 데 문제가 발생했습니다.');
			dispatch(clearGetAuthStatus());
		}
	}, [error, dispatch]);

	if (loading || loading === null) {
		if (showLoader) {
			return <div>Loading....</div>;
		}

		return <div />;
	}

	return children;
}

export default AuthLoader;
