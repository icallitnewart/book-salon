import React from 'react';
import { styled } from 'styled-components';

import Logo from '../atoms/Logo';
import SearchBar from '../molecules/SearchBar';
import Navigation from '../molecules/Navigation';

const Container = styled.header`
	position: fixed;
	z-index: 100;
	display: flex;
	justify-content: center;
	width: 100%;
	min-width: var(--desktop-screen-width);
	height: var(--header-height);

	background-color: #fff;
	border-bottom: 1px solid #eee;
`;

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	align-items: center;
	width: var(--desktop-screen-width);
	height: 100%;
`;

function Header(): JSX.Element {
	return (
		<Container>
			<Wrapper>
				<Logo />
				<SearchBar />
				<Navigation />
			</Wrapper>
		</Container>
	);
}

export default Header;
