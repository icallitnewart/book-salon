import React from 'react';
import { styled } from 'styled-components';

import SectionTitleWithHighlight from '../molecules/SectionTitleWithHighlight';

const Container = styled.section`
	width: 100%;
	padding: 60px 0px;
`;

interface IMainSectionProps {
	title: string;
	children: JSX.Element;
}

function MainSection({ title, children }: IMainSectionProps): JSX.Element {
	return (
		<Container>
			<SectionTitleWithHighlight title={title} />
			{children}
		</Container>
	);
}

export default MainSection;
