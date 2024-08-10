import { css } from 'styled-components';

// variants of input styles (shape)
export const inputVariantStyles = {
	primary: css<IInputStylesProps>`
		height: 50px;
		line-height: 50px;
		border-radius: 5px;
		border: 1px solid #ddd;
		box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.05);
		color: #444;
		outline: none;

		&:focus {
			border: 1px solid #bbb;
		}
	`,
	search: css<IInputStylesProps>`
		height: 40px;
		line-height: 40px;
		border-radius: 50px;
		border: 1px solid var(--sub-color-green);
		outline: none;
	`,
	invisible: css<IInputStylesProps>`
		border: none;
		outline: none;
	`,
};

export interface IInputStylesProps {
	$width?: string;
	$height?: string;
	$minHeight?: string;
	$maxHeight?: string;
	$padding?: string;
	$margin?: string;

	$border?: string;
	$borderRadius?: string;
	$boxShadow?: string;
	$outline?: string;

	$fontFamily?: string;
	$fontSize?: number;
	$fontWeight?: number;

	$color?: string;
	$bgColor?: string;
	$placeholderColor?: string;
	$focusBorderColor?: string;

	$isTextarea?: boolean;
	$variant?: keyof typeof inputVariantStyles;
}

export const inputStyles = css<IInputStylesProps>`
	width: ${({ $width }) => $width || '100%'};
	${({ $height }) => $height && `height: ${$height};`}
	${({ $height }) => $height && `line-height: ${$height};`}
	${({ $minHeight }) => $minHeight && `min-height: ${$minHeight};`}
	${({ $maxHeight }) => $maxHeight && `max-height: ${$maxHeight};`}
	padding: ${({ $padding }) => $padding || '0px 15px'};
	${({ $margin }) => $margin && `margin: ${$margin};`}
	${({ $boxShadow }) => $boxShadow && `box-shadow: ${$boxShadow};`}

	${({ $border }) => $border && `border: ${$border};`}
	${({ $borderRadius }) => $borderRadius && `border-radius: ${$borderRadius};`}
	${({ $outline }) => $outline && `outline: ${$outline};`}

	font-family: ${({ $fontFamily }) => $fontFamily || 'var(--main-font-kor)'};
	font-size: ${({ $fontSize }) => $fontSize || 1.6}rem;
	font-weight: ${({ $fontWeight }) => $fontWeight || 400};

	color: ${({ $color }) => $color || '#444'};
	${({ $bgColor }) => $bgColor && `background-color: ${$bgColor};`}

	${({ $focusBorderColor }) =>
		$focusBorderColor && `&:focus { border-color: ${$focusBorderColor}; }`}

		&::placeholder {
		color: ${({ $placeholderColor }) => $placeholderColor || '#999'};
	}

	${({ $isTextarea }) =>
		$isTextarea &&
		css`
			resize: none;
			overflow-y: hidden;
		`}
	${({ $variant }) => $variant && inputVariantStyles[$variant]}
`;
