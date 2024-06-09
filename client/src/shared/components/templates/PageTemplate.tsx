import React from 'react';
import styled from 'styled-components';

import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	min-height: 100vh;
`;

const Content = styled.main`
	flex: 1;
	width: 1200px;
`;

interface IPageTemplateProps {
	children: React.ReactElement;
}

function PageTemplate({ children }: IPageTemplateProps): JSX.Element {
	return (
		<Container>
			<Header />
			<Content>{children}</Content>
			{/* <Footer /> */}
		</Container>
	);
}

export default PageTemplate;
