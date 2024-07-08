import React from 'react';
import styled from 'styled-components';

interface IDividerProps {
	$width?: string;
	$color?: string;
	$margin?: string;
	$marginTop?: string;
	$marginBottom?: string;
	$marginRight?: string;
	$marginLeft?: string;
}

const Line = styled.span<IDividerProps>`
	display: inline-block;
	width: ${({ $width }) => $width || '100%'};
	height: 0.8px;

	background-color: ${({ $color }) => $color || '#ddd'};
	${({ $margin }) => $margin && `margin: ${$margin};`}
	${({ $marginTop }) => $marginTop && `margin-top: ${$marginTop};`}
	${({ $marginBottom }) => $marginBottom && `margin-bottom: ${$marginBottom};`}
  ${({ $marginRight }) => $marginRight && `margin-right: ${$marginRight};`}
  ${({ $marginLeft }) => $marginLeft && `margin-left: ${$marginLeft};`}
`;

function Divider({
	$width,
	$color,
	$margin,
	$marginTop,
	$marginBottom,
	$marginLeft,
	$marginRight,
}: IDividerProps): JSX.Element {
	return (
		<Line
			$width={$width}
			$color={$color}
			$margin={$margin}
			$marginTop={$marginTop}
			$marginBottom={$marginBottom}
			$marginLeft={$marginLeft}
			$marginRight={$marginRight}
		/>
	);
}

export default Divider;
