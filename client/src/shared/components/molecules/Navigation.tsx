import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../redux/store';

import MenuLink from '../atoms/MenuLink';

const Container = styled.nav`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 25px;
	height: 100%;
	border-bottom: 1px solid #eee;
`;

function Navigation(): JSX.Element {
	const isAuth = useAppSelector(state => state.user.isAuth);

	return (
		<Container>
			<MenuLink to="/book/review/list">REVIEWS</MenuLink>
			<MenuLink to="/book/quote/list">QUOTES</MenuLink>
			{isAuth ? (
				<MenuLink to="/user/info">MYPAGE</MenuLink>
			) : (
				<MenuLink to="/user/login">LOGIN</MenuLink>
			)}
		</Container>
	);
}

export default Navigation;
