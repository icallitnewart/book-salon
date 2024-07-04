import React from 'react';
import { styled } from 'styled-components';

import MainSectionTitle from '../atoms/MainSectionTitle';

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
			<MainSectionTitle title={title} />
			{children}
		</Container>
	);
}

export default MainSection;
