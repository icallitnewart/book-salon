import React from 'react';
import styled from 'styled-components';

import Header from '@components/organisms/Header';
import Footer from '@components/organisms/Footer';

const Container = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	min-width: var(--desktop-screen-width);
`;

interface IContentStyleProps {
	$width?: string;
}

const Content = styled.main<IContentStyleProps>`
	position: relative;
	top: 100px;
	display: flex;
	width: ${({ $width }) => $width || '1200px'};
	min-height: calc(100vh - 100px);
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
