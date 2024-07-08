import React from 'react';
import styled from 'styled-components';

import Header from '@components/organisms/Header';
import Footer from '@components/organisms/Footer';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	min-width: var(--desktop-screen-width);
	min-height: 100vh;
`;

interface IContentStyleProps {
	$width?: string;
}

const Content = styled.main<IContentStyleProps>`
	flex: 1;
	width: ${({ $width }) => $width || '1200px'};
`;

interface IPageTemplateProps extends IContentStyleProps {
	children: React.ReactElement;
}

function PageTemplate({ children, $width }: IPageTemplateProps): JSX.Element {
	return (
		<Container>
			<Header />
			<Content $width={$width}>{children}</Content>
			{/* <Footer /> */}
		</Container>
	);
}

export default PageTemplate;
