import React from 'react';
import styled from 'styled-components';

import { ITextStylesProps, textStyles } from './TextStyles';

const StyledText = styled.p<ITextStylesProps>`
	${textStyles}
`;

export interface IBaseTextProps extends ITextStylesProps {
	as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	children: React.ReactNode;
}

function BaseText({
	as = 'p',
	children,
	variant = 'article.body',
	$fontSize,
	$fontWeight,
	$fontFamily,
	$letterSpacing,
	$textTransform,
	$color,
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
}: IBaseTextProps): JSX.Element {
	return (
		<StyledText
			as={as}
			variant={variant}
			$fontSize={$fontSize}
			$fontWeight={$fontWeight}
			$fontFamily={$fontFamily}
			$letterSpacing={$letterSpacing}
			$textTransform={$textTransform}
			$color={$color}
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

export default BaseText;
