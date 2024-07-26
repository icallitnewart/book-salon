import React from 'react';
import { styled } from 'styled-components';

import {
	IInputStylesProps,
	inputStyles,
	inputVariantStyles,
} from '../inputStyles';

const StyledInput = styled.input<IInputStylesProps>`
	${inputStyles}
`;

export interface IInputProps extends IInputStylesProps {
	type: string;
	id: string;
	name: string;
	value: string;
	ariaLabel?: string;
	placeholder?: string;
	maxLength?: number;
	disabled?: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	className?: string;
	variant?: keyof typeof inputVariantStyles;
}

export default function BaseInput({
	variant,
	type,
	id,
	name,
	value,
	placeholder,
	ariaLabel,
	maxLength,
	disabled,
	onChange,
	onKeyDown,
	className,
	$width,
	$height,
	$padding,
	$margin,
	$border,
	$borderRadius,
	$boxShadow,
	$outline,
	$fontFamily,
	$fontSize,
	$fontWeight,
	$color,
	$bgColor,
	$placeholderColor,
	$focusBorderColor,
}: IInputProps): JSX.Element {
	return (
		<StyledInput
			type={type}
			id={id}
			name={name}
			value={value}
			placeholder={placeholder}
			aria-label={ariaLabel}
			maxLength={maxLength}
			disabled={disabled}
			onChange={onChange}
			onKeyDown={onKeyDown}
			className={className}
			$variant={variant}
			$width={$width}
			$height={$height}
			$padding={$padding}
			$margin={$margin}
			$border={$border}
			$borderRadius={$borderRadius}
			$boxShadow={$boxShadow}
			$outline={$outline}
			$fontFamily={$fontFamily}
			$fontSize={$fontSize}
			$fontWeight={$fontWeight}
			$color={$color}
			$bgColor={$bgColor}
			$placeholderColor={$placeholderColor}
			$focusBorderColor={$focusBorderColor}
		/>
	);
}

export const withInputStyles = (
	Component: React.ComponentType<IInputProps>,
) => styled(Component)`
	${inputStyles}
`;

export const BaseInputWithStyles = withInputStyles(BaseInput);
