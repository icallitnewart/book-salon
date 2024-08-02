import React from 'react';
import { styled } from 'styled-components';

import { SpanWithStyles } from './TextElements';

const Text = styled(SpanWithStyles)`
	display: inline-block;
	background-color: #f0f0f0;
	padding: 0px 4px;
	border-radius: 3px;

	&::before {
		content: '#';
	}
`;

interface ITagTextProps {
	children: string;
	variantSize?: 'sm' | 'md' | 'lg';
}

function TagText({ children, variantSize = 'md' }: ITagTextProps): JSX.Element {
	return <Text variant={`highlight-meta-${variantSize}`}>{children}</Text>;
}

export default TagText;
