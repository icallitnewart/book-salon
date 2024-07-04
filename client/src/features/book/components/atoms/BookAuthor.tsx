import React from 'react';
import { styled } from 'styled-components';

interface IAuthorStyleProps {
	$fontSize: string;
}

const Author = styled.p<IAuthorStyleProps>`
	font-size: ${({ $fontSize }) => $fontSize};
	font-family: var(--main-font-kor);
	text-align: center;
`;

interface IBookAuthorProps {
	children: string;
	fontSize?: string;
}

function BookAuthor({
	children,
	fontSize = '13px',
}: IBookAuthorProps): JSX.Element {
	return <Author $fontSize={fontSize}>{children}</Author>;
}

export default BookAuthor;
