import React from 'react';
import styled from 'styled-components';

import {
	ITextButtonStylesProps,
	textButtonStyles,
	textButtonVariantStyles,
} from './TextButtonStyles';

const StyledButton = styled.button<ITextButtonStylesProps>`
	${textButtonStyles}
`;

interface IButtonProps extends ITextButtonStylesProps {
	as?: string;
	children: string;
	handleClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
}

function TextButton({
	as = 'button',
	children,
	type = 'button',
	handleClick = () => {},
	$bgColor,
	$color,
	$hoverBgColor,
	$hoverTextColor,
	$border,
	$borderRadius,
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
			$bgColor={$bgColor}
			$color={$color}
			$hoverBgColor={$hoverBgColor}
			$hoverTextColor={$hoverTextColor}
			$border={$border}
			$borderRadius={$borderRadius}
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

export const BaseTextButton = styled(TextButton).attrs({
	as: 'button',
})<ITextButtonStylesProps>`
	${textButtonStyles}

	${({ variant }) =>
		variant ? textButtonVariantStyles[variant] : textButtonVariantStyles.square}
`;
