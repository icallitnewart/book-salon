import React from 'react';
import styled from 'styled-components';

import Loader from '@components/molecules/Loader';

import {
	ITextButtonStylesProps,
	textButtonStyles,
	textButtonVariantStyles,
} from '../textButtonStyles';

export const StyledButton = styled.button<ITextButtonStylesProps>`
	${textButtonStyles}
`;

export interface IBaseTextButtonProps extends ITextButtonStylesProps {
	as?: string;
	className?: string;
	children: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	isPending?: boolean;
	type?: 'button' | 'submit' | 'reset';
	variant?: keyof typeof textButtonVariantStyles;
}

export default function BaseTextButton({
	as = 'button',
	children,
	className,
	type = 'button',
	variant,
	onClick = () => {},
	disabled = false,
	isPending = false,
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
}: IBaseTextButtonProps): JSX.Element {
	return (
		<StyledButton
			as={as}
			className={className}
			onClick={onClick}
			type={type}
			disabled={disabled || isPending}
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
			{isPending ? <Loader $size="sm" $isDarkBg /> : children}
		</StyledButton>
	);
}

export const withTextButtonStyles = (
	Component: React.ComponentType<IBaseTextButtonProps>,
) => styled(Component)`
	${textButtonStyles}
`;

// expandable styled component
export const BaseTextButtonWithStyles = withTextButtonStyles(BaseTextButton);
