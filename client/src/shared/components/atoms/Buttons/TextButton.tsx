import React from 'react';
import styled from 'styled-components';

import {
	ITextButtonStylesProps,
	textButtonStyles,
	textButtonVariantStyles,
} from './styles/textButtonStyles';

export const StyledButton = styled.button<ITextButtonStylesProps>`
	${textButtonStyles}
`;

export interface ITextButtonProps extends ITextButtonStylesProps {
	as?: string;
	className?: string;
	children: React.ReactNode;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
	variant: keyof typeof textButtonVariantStyles;
}

export default function TextButton({
	as = 'button',
	children,
	className,
	type = 'button',
	variant,
	onClick = () => {},
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
}: ITextButtonProps): JSX.Element {
	return (
		<StyledButton
			as={as}
			className={className}
			onClick={onClick}
			type={type}
			$variant={variant}
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

const withTextButtonStyles = (
	Component: React.ComponentType<ITextButtonProps>,
) => styled(Component)`
	${textButtonStyles}
`;

// expandable styled component
export const TextButtonWithStyles = withTextButtonStyles(TextButton);
