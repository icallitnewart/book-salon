import React from 'react';
import styled from 'styled-components';

interface IButtonStyleProps {
	$bgColor: string;
	$textColor: string;
}

const Button = styled.button<IButtonStyleProps>`
	width: 100%;
	height: 50px;
	cursor: pointer;

	border-radius: 5px;
	color: ${({ $textColor }) => $textColor};
	background-color: ${({ $bgColor }) => $bgColor};
	font-family: var(--main-font-kor);
	font-weight: 600;
	font-size: 15px;
	letter-spacing: -0.5px;

	&:hover {
		color: var(--sub-color-green);
	}
`;

interface IUserButtonProps {
	type: 'button' | 'submit' | 'reset';
	text: string;
	bgColor?: string;
	textColor?: string;
}

function UserButton({
	type,
	text,
	bgColor = '#000',
	textColor = '#fff',
}: IUserButtonProps): JSX.Element {
	return (
		<Button $bgColor={bgColor} $textColor={textColor} type={type}>
			{text}
		</Button>
	);
}

export default UserButton;
