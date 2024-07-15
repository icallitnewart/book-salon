import { css } from 'styled-components';

// variants of text button styles (colors)
export const textButtonVariantStyles = {
	black: css<ITextButtonStylesProps>`
		background-color: #000;
		color: #fff;

		&:hover {
			color: ${({ $hoverTextColor }) =>
				$hoverTextColor || 'var(--sub-color-green)'};
		}
	`,
	green: css<ITextButtonStylesProps>`
		background-color: var(--sub-color-darkgreen);
		color: #fff;
	`,
	grey: css<ITextButtonStylesProps>`
		background-color: #aaa;
		color: #fff;

		&:hover {
			background-color: ${({ $hoverBgColor }) =>
				$hoverBgColor || 'var(--sub-color-darkgreen)'};
		}
	`,
};

export interface ITextButtonStylesProps {
	$transition?: string;
	$color?: string;
	$bgColor?: string;
	$hoverBgColor?: string;
	$hoverTextColor?: string;
	$border?: string;
	$borderRadius?: string;
	$boxShadow?: string;
	$fontSize?: number;
	$fontWeight?: number;
	$fontFamily?: string;
	$letterSpacing?: string;
	$width?: string;
	$height?: string;
	$padding?: string;
	$margin?: string;

	$variant?: keyof typeof textButtonVariantStyles;
}

export const textButtonStyles = css<ITextButtonStylesProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	width: ${({ $width }) => $width || '100%'};
	height: ${({ $height }) => $height || '50px'};
	padding: ${({ $padding }) => $padding || '0'};
	margin: ${({ $margin }) => $margin || '0'};
	transition: ${({ $transition }) => $transition || 'all 500ms'};

	border: ${({ $border }) => $border || 'none'};
	border-radius: ${({ $borderRadius }) => $borderRadius || '5px'};
	box-shadow: ${({ $boxShadow }) =>
		$boxShadow || '2px 2px 4px rgba(0, 0, 0, 0.2)'};

	${({ $color }) => $color && `color: ${$color};`}
	${({ $bgColor }) => $bgColor && `background-color: ${$bgColor};`}

	font-size: ${({ $fontSize }) => $fontSize || 1.5}rem;
	font-weight: ${({ $fontWeight }) => $fontWeight || '600'};
	font-family: ${({ $fontFamily }) => $fontFamily || 'var(--main-font-kor)'};
	letter-spacing: ${({ $letterSpacing }) => $letterSpacing || '-0.5px'};

	&:hover {
		${({ $hoverBgColor }) =>
			$hoverBgColor && `background-color: ${$hoverBgColor};`}
		${({ $hoverTextColor }) => $hoverTextColor && `color: ${$hoverTextColor};`}
	}

	${({ $variant }) => $variant && textButtonVariantStyles[$variant]}
`;
