import { styled } from 'styled-components';

import { ITextStylesProps, textStyles, textVariantStyles } from './TextStyles';

import BaseText, { IBaseTextProps } from './BaseText';

export const Heading1 = styled(BaseText).attrs((props: IBaseTextProps) => ({
	as: 'h1',
	variant: props.variant || 'section-title-md',
}))<ITextStylesProps>`
	${({ variant }) => variant && textVariantStyles[variant]}
	${textStyles}
`;

export const Heading2 = styled(BaseText).attrs((props: IBaseTextProps) => ({
	as: 'h2',
	variant: props.variant || 'article-title-md',
}))<ITextStylesProps>`
	${({ variant }) => variant && textVariantStyles[variant]}
	${textStyles}
`;

export const Heading3 = styled(BaseText).attrs((props: IBaseTextProps) => ({
	as: 'h3',
	variant: props.variant || 'article-subtitle-md',
}))<ITextStylesProps>`
	${({ variant }) => variant && textVariantStyles[variant]}
	${textStyles}
`;

export const Heading4 = styled(BaseText).attrs((props: IBaseTextProps) => ({
	as: 'h4',
	variant: props.variant || 'article-subtitle-md',
}))<ITextStylesProps>`
	${({ variant }) => variant && textVariantStyles[variant]}
	${textStyles}
`;

export const Paragraph = styled(BaseText).attrs((props: IBaseTextProps) => ({
	as: 'p',
	variant: props.variant || 'article-body-md',
}))<ITextStylesProps>`
	${({ variant }) => variant && textVariantStyles[variant]}
	${textStyles}
`;

export const Span = styled(BaseText).attrs((props: IBaseTextProps) => ({
	as: 'span',
	variant: props.variant || 'article-meta-md',
}))<ITextStylesProps>`
	${({ variant }) => variant && textVariantStyles[variant]}
	${textStyles}
`;
