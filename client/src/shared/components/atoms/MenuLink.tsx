import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface IMenuStyleProps {
	$isActive?: boolean;
}

const Menu = styled(NavLink)<IMenuStyleProps>`
	color: ${({ $isActive }) =>
		$isActive ? 'var(--sub-color-darkgreen)' : '#333'};
	font-family: var(--main-font-eng);
	font-size: 16px;
	font-weight: 500;
	letter-spacing: 0.5px;
	-webkit-text-stroke: 0.2px;
	text-decoration: none;

	&.active {
		color: var(--sub-color-darkgreen);
	}

	&:hover {
		color: var(--sub-color-darkgreen);
	}
`;

interface IMenuLinkProps extends IMenuStyleProps {
	children: string;
	to: string;
}

function MenuLink({ children, to, $isActive }: IMenuLinkProps): JSX.Element {
	return (
		<Menu to={to} $isActive={$isActive}>
			{children}
		</Menu>
	);
}

export default MenuLink;
