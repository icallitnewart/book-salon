import React from 'react';
import { styled } from 'styled-components';

interface ITitleStyleProps {
	$lineClamp: number;
	$fontSize: string;
}

const Title = styled.h2<ITitleStyleProps>`
	margin: 13px 0 8px;
	font-size: ${({ $fontSize }) => $fontSize};
	line-height: 1.6;
	font-weight: 600;
	font-family: var(--main-font-kor);
	text-align: center;

	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	word-wrap: break-word;
`;

interface IBookTitleProps {
	children: string;
	fontSize?: string;
	lineClamp?: number;
}

function BookTitle({
	children,
	fontSize = '15px',
	lineClamp = 2,
}: IBookTitleProps): JSX.Element {
	return (
		<Title $fontSize={fontSize} $lineClamp={lineClamp}>
			{children}
		</Title>
	);
}

export default BookTitle;
