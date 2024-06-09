import React from 'react';
import styled from 'styled-components';

interface IButtonStyleProps {
	$bgColor: string;
	$textColor: string;
	$hoverBgColor: string;
	$hoverTextColor: string;
}

const Button = styled.button<IButtonStyleProps>`
	width: 100%;
	height: 50px;
	cursor: pointer;

	border: none;
	border-radius: 5px;
	color: ${({ $textColor }) => $textColor};
	background-color: ${({ $bgColor }) => $bgColor};
	font-family: var(--main-font-kor);
	font-weight: 600;
	font-size: 15px;
	letter-spacing: -0.5px;
	transition: all 500ms;

	&:hover {
		background-color: ${({ $hoverBgColor }) => $hoverBgColor};
		color: ${({ $hoverTextColor }) => $hoverTextColor};
	}
`;

interface IUserButtonProps {
	type: 'button' | 'submit' | 'reset';
	text: string;
	bgColor?: string;
	textColor?: string;
	hoverBgColor?: string;
	hoverTextColor?: string;
}

function UserButton({
	type,
	text,
	bgColor = '#000',
	textColor = '#fff',
	hoverBgColor = '#000',
	hoverTextColor = 'var(--sub-color-green)',
}: IUserButtonProps): JSX.Element {
	return (
		<Button
			$bgColor={bgColor}
			$textColor={textColor}
			$hoverBgColor={hoverBgColor}
			$hoverTextColor={hoverTextColor}
			type={type}
		>
			{text}
		</Button>
	);
}

export default UserButton;
