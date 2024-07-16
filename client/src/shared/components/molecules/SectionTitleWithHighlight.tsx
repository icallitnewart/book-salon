import React from 'react';

import { Heading2, HighlightedText } from '@typographies';

interface ITitleStyleProps {
	variantSize?: 'sm' | 'md' | 'lg';
	$textAlign?: 'left' | 'center' | 'right' | 'justify';
	$marginBottom?: string;
}

interface IMainSectionTitleProps extends ITitleStyleProps {
	title: string;
}

function SectionTitleWithHighlight({
	title,
	variantSize = 'md',
	$textAlign,
	$marginBottom = '40px',
}: IMainSectionTitleProps): JSX.Element {
	const words = title.split(' ');
	const lastWord = words.pop();

	return (
		<Heading2
			variant={`section-title-${variantSize}`}
			$textAlign={$textAlign}
			$textTransform="uppercase"
			$marginBottom={$marginBottom}
		>
			{words.map(word => `${word} `)}
			<HighlightedText $fontWeight={700}>{lastWord}</HighlightedText>
		</Heading2>
	);
}

export default SectionTitleWithHighlight;
