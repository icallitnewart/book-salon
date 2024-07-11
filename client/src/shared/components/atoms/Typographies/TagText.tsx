import React from 'react';
import { styled } from 'styled-components';

import { Span } from './TextElements';

const Text = styled(Span).attrs({
	$color: 'var(--sub-color-darkgreen)',
	$fontWeight: 500,
})`
	display: inline-block;
	background-color: #f0f0f0;
	padding: 0px 3px;
	border-radius: 3px;

	&::before {
		content: '#';
	}
`;

interface ITagTextProps {
	children: string;
}

function TagText({ children }: ITagTextProps): JSX.Element {
	return <Text variant="article-meta-md">{children}</Text>;
}

export default TagText;
