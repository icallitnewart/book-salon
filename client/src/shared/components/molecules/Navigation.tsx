import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '@redux/store';

import { ROUTES } from '@constants/routes';

import MenuLink from '../atoms/MenuLink';

const Container = styled.nav`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 25px;
	height: 100%;
`;

function Navigation(): JSX.Element {
	const isAuth = useAppSelector(state => state.user.isAuth);

	return (
		<Container>
			<MenuLink to={ROUTES.BOOK.REVIEW.LIST}>REVIEWS</MenuLink>
			<MenuLink to={ROUTES.BOOK.QUOTE.LIST}>QUOTES</MenuLink>
			{isAuth ? (
				<MenuLink to={ROUTES.USER.MY_PROFILE}>MYPAGE</MenuLink>
			) : (
				<MenuLink to={ROUTES.USER.LOGIN}>LOGIN</MenuLink>
			)}
		</Container>
	);
}

export default Navigation;
