import React from 'react';
import styled from 'styled-components';

import { ITextButtonStylesProps, textButtonStyles } from './TextButtonStyles';

const StyledButton = styled.button<ITextButtonStylesProps>`
	${textButtonStyles}
`;

interface IButtonProps extends ITextButtonStylesProps {
	as?: string;
	children: string;
	handleClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
}

function BaseTextButton({
	as = 'button',
	children,
	type = 'button',
	variant = 'square',
	handleClick = () => {},
	$bgColor,
	$color,
	$hoverBgColor,
	$hoverTextColor,
	$border,
	$borderRadius,
	$boxShadow,
	$fontSize,
	$fontWeight,
	$fontFamily,
	$letterSpacing,
	$width,
	$height,
	$padding,
	$margin,
}: IButtonProps): JSX.Element {
	return (
		<StyledButton
			as={as}
			onClick={handleClick}
			type={type}
			variant={variant}
			$bgColor={$bgColor}
			$color={$color}
			$hoverBgColor={$hoverBgColor}
			$hoverTextColor={$hoverTextColor}
			$border={$border}
			$borderRadius={$borderRadius}
			$boxShadow={$boxShadow}
			$fontSize={$fontSize}
			$fontWeight={$fontWeight}
			$fontFamily={$fontFamily}
			$letterSpacing={$letterSpacing}
			$width={$width}
			$height={$height}
			$padding={$padding}
			$margin={$margin}
		>
			{children}
		</StyledButton>
	);
}

export default BaseTextButton;
