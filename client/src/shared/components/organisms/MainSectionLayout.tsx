import React from 'react';
import { styled } from 'styled-components';

import SectionTitleWithHighlight from '../molecules/SectionTitleWithHighlight';

const Container = styled.section`
	width: 100%;
	padding: 60px 0px;
`;

interface IMainSectionLayoutProps {
	title: string;
	children: JSX.Element;
}

function MainSectionLayout({
	title,
	children,
}: IMainSectionLayoutProps): JSX.Element {
	return (
		<Container>
			<SectionTitleWithHighlight title={title} />
			{children}
		</Container>
	);
}

export default MainSectionLayout;
