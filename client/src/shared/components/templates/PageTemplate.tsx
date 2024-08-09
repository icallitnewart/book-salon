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
	top: var(--header-height);
	display: grid;
	grid-template-rows: 1fr;
	width: ${({ $width }) => $width || '1200px'};
	// TODO: footer 높이만큼 빼기
	min-height: calc(100vh - var(--header-height));
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
