import React from 'react';
import { styled } from 'styled-components';

interface IContainerStyleProps {
	$color?: string;
	$width?: string;
	$height?: string;
	$aspectRatio?: string;
}

const Container = styled.div<IContainerStyleProps>`
	display: flex;
	justify-content: center;
	align-items: center;

	width: ${({ $width }) => $width || '100%'};
	aspect-ratio: ${({ $aspectRatio }) => $aspectRatio || '1 / 1'};
	${({ $height }) => $height && `height: ${$height};`}
	border-radius: 5px;
	background-color: ${({ $color }) => $color || '#f5f4f3'};
`;

interface IBookImageBackgroundProps extends IContainerStyleProps {
	children: JSX.Element;
}

function BookImageBackground({
	children,
	$color,
	$width,
	$height,
	$aspectRatio,
}: IBookImageBackgroundProps): JSX.Element {
	return (
		<Container
			$color={$color}
			$width={$width}
			$height={$height}
			$aspectRatio={$aspectRatio}
		>
			{children}
		</Container>
	);
}

export default BookImageBackground;
