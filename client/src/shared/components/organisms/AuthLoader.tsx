import React, { useEffect } from 'react';

import useDelayedLoading from '@features/user/hooks/useDelayedLoading';
import useAuthUser from '@features/user/hooks/useAuthUser';

interface IAuthLoaderProps {
	children: JSX.Element;
}

function AuthLoader({ children }: IAuthLoaderProps): JSX.Element {
	const { isPending, isError, isFetchedAfterMount } = useAuthUser();
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
			return <div>Loading....</div>;
		}

		return <div />;
	}

	return children;
}

export default AuthLoader;
