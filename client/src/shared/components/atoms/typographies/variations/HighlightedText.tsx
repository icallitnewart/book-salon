/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { styled } from 'styled-components';

interface IHighlightStyleProps {
	$fontSize?: number;
	$fontFamily?: string;
	$fontWeight?: number;
	$lineHeight?: number;
	$letterSpacing?: string;
}

const Highlight = styled.span<IHighlightStyleProps>`
	display: inline-block;
	background-color: #000;
	color: var(--sub-color-green);
	border-radius: 5px;
	padding: 5px;

	font-size: ${({ $fontSize }) => $fontSize || 'inherit'};
	font-family: ${({ $fontFamily }) => $fontFamily || 'inherit'};
	font-weight: ${({ $fontWeight }) => $fontWeight || 'inherit'};
	line-height: ${({ $lineHeight }) => $lineHeight || 'inherit'};
	letter-spacing: ${({ $letterSpacing }) => $letterSpacing || 'inherit'};
`;

interface IHightlightedTitleTextProps extends IHighlightStyleProps {
	children: React.ReactNode;
}

function HighlightedText({
	children,
	$fontSize,
	$fontFamily,
	$fontWeight,
	$lineHeight,
	$letterSpacing,
}: IHightlightedTitleTextProps): JSX.Element {
	return (
		<Highlight
			$fontFamily={$fontFamily}
			$lineHeight={$lineHeight}
			$fontSize={$fontSize}
			$fontWeight={$fontWeight}
			$letterSpacing={$letterSpacing}
		>
			{children}
		</Highlight>
	);
}

export default HighlightedText;
