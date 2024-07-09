import React from 'react';

import { Heading2 } from '@typographies/TextElements';
import HighlightedTitleText from '@typographies/HighlightedTitleText';

interface ITitleStyleProps {
	$fontSize?: number;
	$fontWeight?: number;
	$textAlign?: 'left' | 'center' | 'right' | 'justify';
	$marginBottom?: string;
}

interface IMainSectionTitleProps extends ITitleStyleProps {
	title: string;
}

function SectionTitleWithHighlight({
	title,
	$fontSize = 2.4,
	$fontWeight = 800,
	$textAlign,
	$marginBottom = '40px',
}: IMainSectionTitleProps): JSX.Element {
	const words = title.split(' ');
	const lastWord = words.pop();

	return (
		<Heading2
			$fontSize={$fontSize}
			$fontWeight={$fontWeight}
			$fontFamily="var(--main-font-eng)"
			$letterSpacing={1}
			$textAlign={$textAlign}
			$textTransform="uppercase"
			$marginBottom={$marginBottom}
		>
			{words.map(word => `${word} `)}
			<HighlightedTitleText
				$fontSize={$fontSize}
				$fontWeight={$fontWeight - 100}
			>
				{lastWord}
			</HighlightedTitleText>
		</Heading2>
	);
}

export default SectionTitleWithHighlight;
