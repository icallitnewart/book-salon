import React from 'react';
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
	const { data: isAuth } = useAuthUser({
		select: data => data.isAuth,
	});

	return (
		<Container>
			<MenuLink to={ROUTES.REVIEW.LIST}>REVIEWS</MenuLink>
			{isAuth ? (
				<MenuLink to={ROUTES.USER.MY_PROFILE}>MYPAGE</MenuLink>
			) : (
				<MenuLink to={ROUTES.USER.LOGIN}>LOGIN</MenuLink>
			)}
		</Container>
	);
}

export default Navigation;
