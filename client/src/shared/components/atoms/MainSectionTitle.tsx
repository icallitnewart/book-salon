import React from 'react';
import { styled } from 'styled-components';

interface ITitleStyleProps {
	$marginBottom?: string;
}

const Title = styled.h1<ITitleStyleProps>`
	margin-bottom: ${({ $marginBottom }) => $marginBottom || '0'};

	font-size: 24px;
	font-weight: 800;
	font-family: var(--main-font-eng);
	letter-spacing: 1.5px;
	text-transform: uppercase;
`;

const Highlight = styled.span`
	display: inline-block;
	padding: 3px;
	background-color: #000;
	color: var(--sub-color-green);
`;

interface IMainSectionTitleProps {
	title: string;
	marginBottom?: string;
}

function MainSectionTitle({
	title,
	marginBottom = '40px',
}: IMainSectionTitleProps): JSX.Element {
	const words = title.split(' ');
	const lastWord = words.pop();

	return (
		<Title $marginBottom={marginBottom}>
			{words.map(word => `${word} `)}
			<Highlight>{lastWord}</Highlight>
		</Title>
	);
}

export default MainSectionTitle;
