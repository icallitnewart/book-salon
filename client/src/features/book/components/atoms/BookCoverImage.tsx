import React from 'react';
import { styled } from 'styled-components';

interface ICoverStyleProps {
	$width?: string;
	$height?: string;
	$boxShadow?: string;
}

const Cover = styled.img<ICoverStyleProps>`
	width: ${({ $width }) => $width || '100%'};
	max-width: 200px;
	height: ${({ $height }) => $height || 'auto'};

	border-radius: 5px;
	${({ $boxShadow }) => $boxShadow && `box-shadow: ${$boxShadow};`}
`;

interface IBookCoverImageProps extends ICoverStyleProps {
	src: string;
	alt: string;
}

function BookCoverImage({
	src,
	alt,
	$width,
	$height,
	$boxShadow,
}: IBookCoverImageProps): JSX.Element {
	return (
		<Cover
			src={src}
			alt={alt}
			$width={$width}
			$height={$height}
			$boxShadow={$boxShadow}
		/>
	);
}

export default BookCoverImage;
