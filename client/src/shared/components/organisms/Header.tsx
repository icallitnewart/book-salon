import React from 'react';
import { styled } from 'styled-components';

const Container = styled.header`
	width: 100%;
	height: 100px;
	border-bottom: 1px solid #eee;
`;

function Header(): JSX.Element {
	return <Container> </Container>;
}

export default Header;
