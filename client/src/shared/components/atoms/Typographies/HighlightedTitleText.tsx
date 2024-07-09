import React from 'react';
import { styled } from 'styled-components';

import BaseText from './BaseText';
import { textStyles } from './TextStyles';

const Highlight = styled(BaseText).attrs({ as: 'span' })`
	${textStyles}
	display: inline-block;
	border-radius: 3px;
	background-color: #000;
`;

interface IHighlightedTextProps {
	children: React.ReactNode;
	$fontSize: number;
	$fontWeight: number;
}

function HighlightedTitleText({
	children,
	$fontSize,
	$fontWeight,
}: IHighlightedTextProps): JSX.Element {
	return (
		<Highlight
			$fontSize={$fontSize}
			$fontWeight={$fontWeight}
			$fontFamily="var(--main-font-eng)"
			$lineHeight={1}
			$color="var(--sub-color-green)"
			$padding="5px"
		>
			{children}
		</Highlight>
	);
}

export default HighlightedTitleText;
