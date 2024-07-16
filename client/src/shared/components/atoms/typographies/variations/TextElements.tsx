/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import BaseText, { ITextProps, withTextStyles } from './BaseText';

export function Heading1({
	variant,
	children,
	...props
}: ITextProps): JSX.Element {
	return (
		<BaseText as="h1" variant={variant || 'section-title-md'} {...props}>
			{children}
		</BaseText>
	);
}

export function Heading2({
	variant,
	children,
	...props
}: ITextProps): JSX.Element {
	return (
		<BaseText as="h2" variant={variant || 'article-title-md'} {...props}>
			{children}
		</BaseText>
	);
}

export function Heading3({
	variant,
	children,
	...props
}: ITextProps): JSX.Element {
	return (
		<BaseText as="h3" variant={variant || 'article-subtitle-md'} {...props}>
			{children}
		</BaseText>
	);
}

export function Heading4({
	variant,
	children,
	...props
}: ITextProps): JSX.Element {
	return (
		<BaseText as="h4" variant={variant || 'article-subtitle-md'} {...props}>
			{children}
		</BaseText>
	);
}

export function Paragraph({
	variant,
	children,
	...props
}: ITextProps): JSX.Element {
	return (
		<BaseText as="p" variant={variant || 'article-body-md'} {...props}>
			{children}
		</BaseText>
	);
}

export function Span({ variant, children, ...props }: ITextProps): JSX.Element {
	return (
		<BaseText as="span" variant={variant || 'article-meta-md'} {...props}>
			{children}
		</BaseText>
	);
}

// expandable styled component
export const Heading1WithStyles = withTextStyles(Heading1);
export const Heading2WithStyles = withTextStyles(Heading2);
export const Heading3WithStyles = withTextStyles(Heading3);
export const Heading4WithStyles = withTextStyles(Heading4);
export const ParagraphWithStyles = withTextStyles(Paragraph);
export const SpanWithStyles = withTextStyles(Span);
