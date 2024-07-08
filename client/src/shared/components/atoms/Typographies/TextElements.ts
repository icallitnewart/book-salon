import { styled } from 'styled-components';

import { ITextStylesProps, textStyles, textVariantStyles } from './TextStyles';

import BaseText, { IBaseTextProps } from './BaseText';

export const Heading1 = styled(BaseText).attrs((props: IBaseTextProps) => ({
	as: 'h1',
	variant: props.variant || 'section.title',
}))<ITextStylesProps>`
	${({ variant }) => variant && textVariantStyles[variant]}
	${textStyles}
`;

export const Heading2 = styled(BaseText).attrs((props: IBaseTextProps) => ({
	as: 'h2',
	variant: props.variant || 'article.title',
}))<ITextStylesProps>`
	${({ variant }) => variant && textVariantStyles[variant]}
	${textStyles}
`;

export const Heading3 = styled(BaseText).attrs((props: IBaseTextProps) => ({
	as: 'h3',
	variant: props.variant || 'article.subtitle',
}))<ITextStylesProps>`
	${({ variant }) => variant && textVariantStyles[variant]}
	${textStyles}
`;

export const Paragraph = styled(BaseText).attrs((props: IBaseTextProps) => ({
	as: 'p',
	variant: props.variant || 'article.body',
}))<ITextStylesProps>`
	${({ variant }) => variant && textVariantStyles[variant]}
	${textStyles}
`;

export const Span = styled(BaseText).attrs((props: IBaseTextProps) => ({
	as: 'span',
	variant: props.variant || 'article.info',
}))<ITextStylesProps>`
	${({ variant }) => variant && textVariantStyles[variant]}
	${textStyles}
`;
