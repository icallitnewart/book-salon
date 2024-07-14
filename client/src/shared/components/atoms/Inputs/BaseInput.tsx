import React from 'react';
import { styled } from 'styled-components';

import { IInputStylesProps, inputStyles } from './inputStyles';

const StyledInput = styled.input<IInputStylesProps>`
	${inputStyles}
`;

interface IBaseInputProps extends IInputStylesProps {
	type: string;
	id: string;
	name: string;
	value: string;
	ariaLabel?: string;
	placeholder?: string;
	maxLength?: number;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function BaseInput({
	variant,
	type,
	id,
	name,
	value,
	placeholder,
	ariaLabel,
	maxLength,
	onChange,
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
}: IBaseInputProps): JSX.Element {
	return (
		<StyledInput
			variant={variant}
			type={type}
			id={id}
			name={name}
			value={value}
			placeholder={placeholder}
			aria-label={ariaLabel}
			maxLength={maxLength}
			onChange={onChange}
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

export default BaseInput;
