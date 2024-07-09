import { css } from 'styled-components';

export interface ITextStylesProps {
	$fontSize?: number;
	$fontWeight?: number;
	$fontFamily?: string;
	$letterSpacing?: number;
	$textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
	$textAlign?: 'left' | 'center' | 'right' | 'justify';
	$color?: string;
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
`;

// variants of text styles (different font sizes, colors, etc.)
export const textVariantStyles = {
	'section.title': css<ITextStylesProps>`
		font-size: 2.4rem;
		font-weight: 600;
		color: #000;
	`,
	'article.title': css<ITextStylesProps>`
		font-size: 2.2rem;
		font-weight: 600;
		color: #000;
	`,
	'article.subtitle': css<ITextStylesProps>`
		font-size: 1.8rem;
		font-weight: 500;
		color: #444;
	`,
	'article.body': css<ITextStylesProps>`
		font-size: 1.6rem;
		line-height: 1.6;
		font-weight: 400;
		color: #444;
	`,
	'article.field': css<ITextStylesProps>`
		font-size: 1.6rem;
		line-height: 1.6;
		font-weight: 600;
		color: #222;
	`,
	'article.info': css<ITextStylesProps>`
		font-size: 1.4rem;
		color: #444;
	`,
	'card.title': css<ITextStylesProps>`
		font-size: 1.5rem;
		font-weight: 600;
		color: #000;
	`,
	'card.subtitle': css<ITextStylesProps>`
		font-size: 1.4rem;
		color: #333;
	`,
	'card.info': css<ITextStylesProps>`
		font-size: 1.3rem;
		color: #666;
	`,
	'list.title': css<ITextStylesProps>`
		font-size: 1.6rem;
		font-weight: 600;
		color: #000;
	`,
	'list.summary': css<ITextStylesProps>`
		font-size: 1.4rem;
		color: #444;
	`,
	'list.meta': css<ITextStylesProps>`
		font-size: 1.2rem;
		color: #888;
	`,
};
