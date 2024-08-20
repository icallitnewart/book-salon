import React from 'react';
import { styled } from 'styled-components';

const ErrorMessage = styled.span`
	display: block;
	width: 100%;
	height: 25px;
	padding: 5px 2px;

	color: var(--sub-color-darkgreen);
	font-size: 12px;
	font-weight: 600;
	font-family: var(--main-font-kor);
`;

interface IUserErrorMessageProps {
	error?: string;
}

function UserErrorMessage({ error = '' }: IUserErrorMessageProps): JSX.Element {
	return <ErrorMessage>{error}</ErrorMessage>;
}

export default UserErrorMessage;
