import React from 'react';
import styled from 'styled-components';

import { ITextStylesProps, textStyles, textVariantStyles } from '../textStyles';

const StyledText = styled.p<ITextStylesProps>`
	${textStyles}
`;

export interface ITextProps extends ITextStylesProps {
	as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	children: React.ReactNode;
	className?: string;
	variant?: keyof typeof textVariantStyles;
}

export default function BaseText({
	as = 'p',
	children,
	className,
	variant,
	$fontSize,
	$fontWeight,
	$fontFamily,
	$letterSpacing,
	$textTransform,
	$textAlign,
	$color,
	$hoverColor,
	$width,
	$margin,
	$marginBottom,
	$marginTop,
	$marginLeft,
	$marginRight,
	$padding,
	$paddingBottom,
	$paddingTop,
	$paddingLeft,
	$paddingRight,
	$lineHeight,
	$ellipsis = false,
	$lineClamp,
}: ITextProps): JSX.Element {
	return (
		<StyledText
			as={as}
			className={className}
			$variant={variant}
			$fontSize={$fontSize}
			$fontWeight={$fontWeight}
			$fontFamily={$fontFamily}
			$letterSpacing={$letterSpacing}
			$textTransform={$textTransform}
			$textAlign={$textAlign}
			$color={$color}
			$hoverColor={$hoverColor}
			$width={$width}
			$margin={$margin}
			$marginBottom={$marginBottom}
			$marginTop={$marginTop}
			$marginLeft={$marginLeft}
			$marginRight={$marginRight}
			$padding={$padding}
			$paddingBottom={$paddingBottom}
			$paddingTop={$paddingTop}
			$paddingLeft={$paddingLeft}
			$paddingRight={$paddingRight}
			$lineHeight={$lineHeight}
			$ellipsis={$ellipsis}
			$lineClamp={$lineClamp}
		>
			{children}
		</StyledText>
	);
}

export const withTextStyles = (
	Component: React.ComponentType<ITextProps>,
) => styled(Component)`
	${textStyles}
`;

// expandable styled component
export const BaseTextWithStyles = withTextStyles(BaseText);
