import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
	display: block;
	width: 100%;
	margin-bottom: 5px;

	color: #222;
	font-family: var(--main-font-kor);
	font-size: 15px;
	font-weight: 500;
	letter-spacing: -0.5px;
`;

interface IUserInputLabelProps {
	htmlFor: string;
	children: string;
}

function UserInputLabel({
	htmlFor,
	children,
}: IUserInputLabelProps): JSX.Element {
	return <Label htmlFor={htmlFor}>{children}</Label>;
}

export default UserInputLabel;
