import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Menu = styled(NavLink)`
	color: #333;
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

interface IMenuLinkProps {
	children: string;
	to: string;
}

function MenuLink({ children, to }: IMenuLinkProps): JSX.Element {
	return <Menu to={to}>{children}</Menu>;
}

export default MenuLink;
