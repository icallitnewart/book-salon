import React from 'react';
import { styled } from 'styled-components';

interface IImageStyleProps {
	$width?: string;
	$height?: string;
	$boxShadow?: string;
	$borderRadius?: string;
}

const Image = styled.img<IImageStyleProps>`
	width: ${({ $width }) => $width || 'auto'};
	${({ $height }) => $height && `height: ${$height};`}
	aspect-ratio: 0.67 / 1;
	object-fit: cover;
	object-position: left top;

	${({ $borderRadius }) => $borderRadius && `border-radius: ${$borderRadius};`}
	${({ $boxShadow }) => $boxShadow && `box-shadow: ${$boxShadow};`}
`;

interface IBookCoverImageProps extends IImageStyleProps {
	src?: string;
	alt?: string;
}

function BookCoverImage({
	src,
	alt,
	$width,
	$height,
	$boxShadow,
	$borderRadius,
}: IBookCoverImageProps): JSX.Element {
	return (
		<Image
			src={src}
			alt={alt}
			$width={$width}
			$height={$height}
			$boxShadow={$boxShadow}
			$borderRadius={$borderRadius}
		/>
	);
}

export default BookCoverImage;
