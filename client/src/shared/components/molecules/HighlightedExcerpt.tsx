import React, { useMemo } from 'react';
import styled from 'styled-components';
import { nanoid } from 'nanoid';

import { prepareTextForHighlight } from '@utils/dataTransform';
import { typeGuards } from '@typeDefs/typeGuards';

const Mark = styled.span`
	background-color: yellow;
	font-weight: bold;
`;

interface IHighlightedExcerptProps {
	text: string;
	searchTerm: string;
	startLength?: number;
}

function HighlightedExcerpt({
	text,
	searchTerm,
	startLength = 50,
}: IHighlightedExcerptProps): JSX.Element {
	const preparedText = useMemo(
		() => prepareTextForHighlight({ text, searchTerm, startLength }),
		[text, searchTerm, startLength],
	);

	// Nothing to highlight
	if (!typeGuards.isStringArray(preparedText)) {
		return <div>{preparedText}</div>;
	}

	return (
		<div>
			{preparedText.map(part =>
				part.toLowerCase() === searchTerm.toLowerCase() ? (
					<Mark key={nanoid()}>{part}</Mark>
				) : (
					part
				),
			)}
		</div>
	);
}

export default HighlightedExcerpt;
