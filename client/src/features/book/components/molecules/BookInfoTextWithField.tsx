import React from 'react';
import { styled } from 'styled-components';

import { Paragraph, Span } from '@typographies/TextElements';

interface IContainerStyleProps {
	$margin?: string;
}

const Container = styled.div<IContainerStyleProps>`
	display: flex;
	margin: ${({ $margin }) => $margin || '0'};
`;

const BookInfoText = styled(Paragraph)`
	flex: 1;
`;

const BookInfoField = styled(Span)`
	display: inline-block;
`;

interface IBookInfoWithFieldProps {
	field: string;
	text?: string;
	variantSize?: 'sm' | 'md' | 'lg';
	variantType?: 'article' | 'card';
	fieldWidth?: string;
	margin?: string;
}

function BookInfoTextWithField({
	field,
	text,
	fieldWidth,
	variantSize = 'md',
	variantType = 'article',
	margin,
}: IBookInfoWithFieldProps): JSX.Element {
	return (
		<Container $margin={margin}>
			<BookInfoField
				variant={`${variantType}-field-${variantSize}`}
				$lineHeight={1.7}
				$width={fieldWidth}
			>
				{field}
			</BookInfoField>
			<BookInfoText
				variant={`${variantType}-body-${variantSize}`}
				$lineHeight={1.7}
				$width={fieldWidth}
			>
				{text || ''}
			</BookInfoText>
		</Container>
	);
}

export default BookInfoTextWithField;
