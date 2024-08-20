import React from 'react';
import { css, styled } from 'styled-components';

import { Heading3, Paragraph } from '@typographies';
import BookCoverWithBackground from './BookCoverWithBackground';

const HoverTextBox = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	width: 55%;
	height: 100%;
	padding: 30px 20px 30px 5px;

	transition: opacity 500ms;

	h3 {
		opacity: 0;
		transform: translateY(-10px);
		transition:
			opacity 300ms,
			transform 300ms;
	}

	p {
		opacity: 0;
		transform: translateY(5px);
		transition:
			opacity 300ms,
			transform 300ms;
	}
`;

interface IIsHoveredStyle {
	$isHovered: boolean;
}

const Container = styled.div<IIsHoveredStyle>`
	position: relative;
	width: 100%;
	height: 56%;

	img {
		transition: transform 700ms;
	}

	${({ $isHovered }) =>
		$isHovered &&
		css`
			${HoverTextBox} {
				h3 {
					opacity: 1;
					transform: translateY(0px);
					transition:
						opacity 100ms 400ms,
						transform 100ms 400ms;
				}

				p {
					opacity: 1;
					transform: translateY(0px);
					transition:
						opacity 500ms 500ms,
						transform 500ms 500ms;
				}
			}

			img {
				transform: translateX(-100px);
				transition: transform 500ms;
			}
		`}
`;

interface IBookPreviewImageProps {
	title: string;
	cover: string;
	author: string;
	publisher: string;
	isHovered: boolean;
}

function BookPreviewImage({
	title,
	cover,
	author,
	publisher,
	isHovered,
}: IBookPreviewImageProps) {
	return (
		<Container $isHovered={isHovered}>
			<BookCoverWithBackground
				src={cover}
				$width="100%"
				$imgWidth="120px"
				$height="100%"
				$bgBorderRadius="5px 5px 0 0"
			/>
			<HoverTextBox>
				<Heading3
					variant="card-title-md"
					$marginBottom="10px"
					$ellipsis
					$lineClamp={4}
				>
					{title}
				</Heading3>
				<Paragraph
					variant="card-subtitle-md"
					$marginBottom="5px"
					$fontWeight={500}
					$color="#555"
				>
					{author}
				</Paragraph>
				<Paragraph variant="card-body-md" $color="#666">
					{publisher}
				</Paragraph>
			</HoverTextBox>
		</Container>
	);
}

export default BookPreviewImage;
