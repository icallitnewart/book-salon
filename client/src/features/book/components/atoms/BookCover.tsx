import React from 'react';
import { styled } from 'styled-components';

interface ICoverStyleProps {
	$width: string;
	$height: string;
}

const Cover = styled.img<ICoverStyleProps>`
	width: ${({ $width }) => $width};
	height: ${({ $height }) => $height};
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
	border-radius: 5px;
`;

interface IBookCoverProps {
	src: string;
	alt: string;
	width?: string;
	height?: string;
}

function BookCover({
	src,
	alt,
	width = '100%',
	height = '200px',
}: IBookCoverProps): JSX.Element {
	return <Cover src={src} alt={alt} $width={width} $height={height} />;
}

export default BookCover;
