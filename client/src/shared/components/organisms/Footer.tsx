import React from 'react';
import { styled } from 'styled-components';

const Container = styled.footer`
	width: 100%;
	min-width: var(--desktop-screen-width);
	height: 50px;
`;

function Footer(): JSX.Element {
	return <Container> </Container>;
}

export default Footer;
