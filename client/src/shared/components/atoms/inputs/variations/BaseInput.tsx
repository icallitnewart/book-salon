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
	as?: 'input' | 'textarea';
	type?: string;
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
	as = 'input',
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
	$minHeight,
	$maxHeight,
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
			as={as}
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
			$minHeight={$minHeight}
			$maxHeight={$maxHeight}
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
			$isTextarea={as === 'textarea'}
		/>
	);
}

export const withInputStyles = (
	Component: React.ComponentType<IInputProps>,
) => styled(Component)`
	${inputStyles}
`;

export const BaseInputWithStyles = withInputStyles(BaseInput);
