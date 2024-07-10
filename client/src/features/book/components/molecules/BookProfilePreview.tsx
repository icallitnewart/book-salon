import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

import { IBookProfilePreview } from '@features/book/types/bookProfile';

import { Heading3, Paragraph } from '@typographies/TextElements';
import BookCoverImage from '@features/book/components/atoms/BookCoverImage';

interface ILinkContainerStyleProps {
	$width?: string;
	$height?: string;
}

const LinkContainer = styled(Link)<ILinkContainerStyleProps>`
	display: flex;
	flex-direction: column;
	width: ${({ $width }) => $width || '100%'};
	height: ${({ $height }) => $height || '100%'};
`;

interface IBookProfilePreviewProps
	extends ILinkContainerStyleProps,
		IBookProfilePreview {
	$fontSize?: 'xs' | 'sm' | 'md' | 'lg';
	$titleMargin?: string;
	$imgBorderRadius?: string;
}

function BookProfilePreview({
	title,
	author,
	cover,
	link,
	$fontSize = 'md',
	$imgBorderRadius,
	$titleMargin,
	$width,
	$height,
}: IBookProfilePreviewProps): JSX.Element {
	return (
		<LinkContainer to={link || ''} $width={$width} $height={$height}>
			<BookCoverImage
				src={cover}
				alt={`${title} 도서 이미지`}
				$width={$width}
				$boxShadow="0 0 10px rgba(0, 0, 0, 0.15)"
				$borderRadius={$imgBorderRadius}
			/>
			<Heading3
				variant={`card-title-${$fontSize}`}
				$margin={$titleMargin}
				$ellipsis
				$lineClamp={author ? 2 : 3}
				$textAlign="center"
			>
				{title.split(' - ')[0]}
			</Heading3>
			{author && (
				<Paragraph
					variant={`card-subtitle-${$fontSize}`}
					$ellipsis
					$lineClamp={2}
					$textAlign="center"
				>
					{author.split(/ \(지은이\)| \(엮은이\)/)[0]}
				</Paragraph>
			)}
		</LinkContainer>
	);
}

export default BookProfilePreview;
