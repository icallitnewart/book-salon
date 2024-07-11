import { css } from 'styled-components';

export interface ITextStylesProps {
	$fontSize?: number;
	$fontWeight?: number;
	$fontFamily?: string;
	$letterSpacing?: number;
	$textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
	$textAlign?: 'left' | 'center' | 'right' | 'justify';
	$color?: string;
	$hoverColor?: string;
	$width?: string;
	$wordBreak?: 'break-all' | 'break-word' | 'keep-all' | 'normal';
	$margin?: string;
	$marginBottom?: string;
	$marginTop?: string;
	$marginLeft?: string;
	$marginRight?: string;
	$padding?: string;
	$paddingBottom?: string;
	$paddingTop?: string;
	$paddingLeft?: string;
	$paddingRight?: string;
	$lineHeight?: number;
	$ellipsis?: boolean;
	$lineClamp?: number;

	variant?: keyof typeof textVariantStyles;
}

export const textStyles = css<ITextStylesProps>`
	font-family: ${({ $fontFamily }) => $fontFamily || 'var(--main-font-kor)'};
	line-height: ${({ $lineHeight }) => $lineHeight || 1.5};
	${({ $fontSize }) => $fontSize && `font-size: ${$fontSize}rem;`}
	${({ $fontWeight }) => $fontWeight && `font-weight: ${$fontWeight};`}
	${({ $color }) => $color && `color: ${$color};`}
	${({ $letterSpacing }) =>
		$letterSpacing && `letter-spacing: ${$letterSpacing}px;`}
	${({ $textTransform }) =>
		$textTransform && `text-transform: ${$textTransform};`}
	${({ $textAlign }) => $textAlign && `text-align: ${$textAlign};`}
	${({ $wordBreak }) => $wordBreak && `word-break: ${$wordBreak};`}
		
	${({ $width }) => $width && `width: ${$width};`}

	${({ $margin }) => $margin && `margin: ${$margin};`}
	${({ $marginTop }) => $marginTop && `margin-top: ${$marginTop};`}
  ${({ $marginBottom }) => $marginBottom && `margin-bottom: ${$marginBottom};`}
  ${({ $marginRight }) => $marginRight && `margin-right: ${$marginRight};`}
  ${({ $marginLeft }) => $marginLeft && `margin-left: ${$marginLeft};`}

	${({ $padding }) => $padding && `padding: ${$padding};`}
	${({ $paddingTop }) => $paddingTop && `padding-top: ${$paddingTop};`}
	${({ $paddingBottom }) =>
		$paddingBottom && `padding-bottom: ${$paddingBottom};`}
	${({ $paddingRight }) => $paddingRight && `padding-right: ${$paddingRight};`}
	${({ $paddingLeft }) => $paddingLeft && `padding-left: ${$paddingLeft};`}

	${({ $ellipsis, $lineClamp }) =>
		$ellipsis &&
		`
    display: -webkit-box;
    -webkit-line-clamp: ${$lineClamp || 1};
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
  `}

	&:hover {
		${({ $hoverColor }) => $hoverColor && `color: ${$hoverColor};`}
	}
`;

// variants of text styles (different font sizes, colors, etc.)
export const textVariantStyles = {
	'section-title-lg': css<ITextStylesProps>`
		font-size: 3rem;
		font-weight: 600;
		color: #000;
	`,
	'section-title-md': css<ITextStylesProps>`
		font-size: 2.4rem;
		font-weight: 600;
		color: #000;
	`,
	'section-title-sm': css<ITextStylesProps>`
		font-size: 2rem;
		font-weight: 600;
		color: #000;
	`,
	'article-title-lg': css<ITextStylesProps>`
		font-size: 2.4rem;
		font-weight: 600;
		color: #000;
	`,
	'article-title-md': css<ITextStylesProps>`
		font-size: 2.2rem;
		font-weight: 600;
		color: #000;
	`,
	'article-title-sm': css<ITextStylesProps>`
		font-size: 2rem;
		font-weight: 600;
		color: #000;
	`,
	'article-subtitle-lg': css<ITextStylesProps>`
		font-size: 2rem;
		font-weight: 500;
		color: #444;
	`,
	'article-subtitle-md': css<ITextStylesProps>`
		font-size: 1.8rem;
		font-weight: 500;
		color: #444;
	`,
	'article-subtitle-sm': css<ITextStylesProps>`
		font-size: 1.6rem;
		font-weight: 500;
		color: #444;
	`,
	'article-body-lg': css<ITextStylesProps>`
		font-size: 1.6rem;
		line-height: 1.6;
		font-weight: 400;
		color: #444;
	`,
	'article-body-md': css<ITextStylesProps>`
		font-size: 1.5rem;
		line-height: 1.6;
		font-weight: 400;
		color: #444;
	`,
	'article-body-sm': css<ITextStylesProps>`
		font-size: 1.4rem;
		line-height: 1.6;
		font-weight: 400;
		color: #444;
	`,
	'article-field-lg': css<ITextStylesProps>`
		font-size: 1.6rem;
		line-height: 1.6;
		font-weight: 600;
		color: #222;
	`,
	'article-field-md': css<ITextStylesProps>`
		font-size: 1.5rem;
		line-height: 1.6;
		font-weight: 600;
		color: #222;
	`,
	'article-field-sm': css<ITextStylesProps>`
		font-size: 1.4rem;
		line-height: 1.6;
		font-weight: 600;
		color: #222;
	`,
	'article-meta-lg': css<ITextStylesProps>`
		font-size: 1.4rem;
		color: #444;
	`,
	'article-meta-md': css<ITextStylesProps>`
		font-size: 1.3rem;
		color: #444;
	`,
	'article-meta-sm': css<ITextStylesProps>`
		font-size: 1.2rem;
		color: #444;
	`,
	'card-title-lg': css<ITextStylesProps>`
		font-size: 1.6rem;
		font-weight: 600;
		color: #333;
	`,
	'card-title-md': css<ITextStylesProps>`
		font-size: 1.5rem;
		font-weight: 600;
		color: #333;
	`,
	'card-title-sm': css<ITextStylesProps>`
		font-size: 1.4rem;
		font-weight: 600;
		color: #333;
	`,
	'card-title-xs': css<ITextStylesProps>`
		font-size: 1.3rem;
		font-weight: 600;
		color: #333;
	`,
	'card-subtitle-lg': css<ITextStylesProps>`
		font-size: 1.5rem;
		color: #555;
	`,
	'card-subtitle-md': css<ITextStylesProps>`
		font-size: 1.4rem;
		color: #555;
	`,
	'card-subtitle-sm': css<ITextStylesProps>`
		font-size: 1.3rem;
		color: #555;
	`,
	'card-subtitle-xs': css<ITextStylesProps>`
		font-size: 1.2rem;
		color: #555;
	`, // 제거
	'card-field-lg': css<ITextStylesProps>`
		font-size: 1.6rem;
		line-height: 1.6;
		font-weight: 600;
		color: #555;
	`,
	'card-field-md': css<ITextStylesProps>`
		font-size: 1.4rem;
		line-height: 1.6;
		font-weight: 600;
		color: #555;
	`,
	'card-field-sm': css<ITextStylesProps>`
		font-size: 1.2rem;
		line-height: 1.6;
		font-weight: 600;
		color: #555;
	`,
	'card-body-lg': css<ITextStylesProps>`
		font-size: 1.6rem;
		line-height: 1.6;
		color: #222;
	`,
	'card-body-md': css<ITextStylesProps>`
		font-size: 1.4rem;
		line-height: 1.6;
		color: #222;
	`,
	'card-body-sm': css<ITextStylesProps>`
		font-size: 1.2rem;
		line-height: 1.6;
		color: #222;
	`,
	'card-meta-lg': css<ITextStylesProps>`
		font-size: 1.4rem;
		color: #888;
	`,
	'card-meta-md': css<ITextStylesProps>`
		font-size: 1.3rem;
		color: #888;
	`,
	'card-meta-sm': css<ITextStylesProps>`
		font-size: 1.2rem;
		color: #888;
	`,
	'list-title-lg': css<ITextStylesProps>`
		font-size: 2rem;
		font-weight: 600;
		color: #000;
	`,
	'list-title-md': css<ITextStylesProps>`
		font-size: 1.8rem;
		font-weight: 600;
		color: #000;
	`,
	'list-title-sm': css<ITextStylesProps>`
		font-size: 1.6rem;
		font-weight: 600;
		color: #000;
	`,
	'list-body-lg': css<ITextStylesProps>`
		font-size: 1.6rem;
		color: #444;
	`,
	'list-body-md': css<ITextStylesProps>`
		font-size: 1.5rem;
		color: #444;
	`,
	'list-body-sm': css<ITextStylesProps>`
		font-size: 1.4rem;
		color: #444;
	`,
	'list-meta-lg': css<ITextStylesProps>`
		font-size: 1.4rem;
		color: #888;
	`,
	'list-meta-md': css<ITextStylesProps>`
		font-size: 1.3rem;
		color: #888;
	`,
	'list-meta-sm': css<ITextStylesProps>`
		font-size: 1.2rem;
		color: #888;
	`,
	'highlight-meta-lg': css<ITextStylesProps>`
		font-size: 1.4rem;
		color: var(--sub-color-darkgreen);
		font-weight: 500;
		letter-spacing: 1px;
	`,
	'highlight-meta-md': css<ITextStylesProps>`
		font-size: 1.3rem;
		color: var(--sub-color-darkgreen);
		font-weight: 500;
		letter-spacing: 1px;
	`,
	'highlight-meta-sm': css<ITextStylesProps>`
		font-size: 1.2rem;
		color: var(--sub-color-darkgreen);
		font-weight: 500;
		letter-spacing: 1px;
	`,
};
