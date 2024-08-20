import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { ROUTES } from '@constants/routes';
import useAuthUser from '@features/user/hooks/useAuthUser';

import MenuLink from '../atoms/MenuLink';

const Container = styled.nav`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 25px;
	height: 100%;
`;

function Navigation(): JSX.Element {
	const location = useLocation();
	const { data: isAuth } = useAuthUser({
		select: data => data.isAuth,
	});

	const isActiveMyPage = useMemo(() => {
		const activeRoutes = [
			ROUTES.USER.MY_PROFILE,
			ROUTES.USER.PROFILE_EDIT,
			ROUTES.BOOK.LIKED_LIST,
		];
		return !!activeRoutes.find(route => route === location.pathname);
	}, [location]);

	return (
		<Container>
			<MenuLink to={ROUTES.REVIEW.LIST}>REVIEWS</MenuLink>
			{isAuth ? (
				<MenuLink to={ROUTES.USER.MY_PROFILE} $isActive={isActiveMyPage}>
					MYPAGE
				</MenuLink>
			) : (
				<MenuLink to={ROUTES.USER.LOGIN}>LOGIN</MenuLink>
			)}
		</Container>
	);
}

export default Navigation;
