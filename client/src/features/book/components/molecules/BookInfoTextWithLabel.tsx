import React from 'react';
import { styled } from 'styled-components';

import { ParagraphWithStyles, SpanWithStyles } from '@typographies';

interface IContainerStyleProps {
	$margin?: string;
}

const Container = styled.div<IContainerStyleProps>`
	display: flex;
	margin: ${({ $margin }) => $margin || '0'};
`;

const BookInfoText = styled(ParagraphWithStyles)`
	flex: 1;
`;

const BookInfoLabel = styled(SpanWithStyles)`
	display: inline-block;
`;

interface IBookInfoWithFieldProps {
	label: string;
	text?: string;
	variantSize?: 'sm' | 'md' | 'lg';
	variantType?: 'article' | 'card';
	labelWidth?: string;
	margin?: string;
}

function BookInfoTextWithLabel({
	label,
	text,
	labelWidth,
	variantSize = 'md',
	variantType = 'article',
	margin,
}: IBookInfoWithFieldProps): JSX.Element {
	return (
		<Container $margin={margin}>
			<BookInfoLabel
				variant={`${variantType}-field-${variantSize}`}
				$lineHeight={1.7}
				$width={labelWidth}
			>
				{label}
			</BookInfoLabel>
			<BookInfoText
				variant={`${variantType}-body-${variantSize}`}
				$lineHeight={1.7}
			>
				{text || ''}
			</BookInfoText>
		</Container>
	);
}

export default BookInfoTextWithLabel;
