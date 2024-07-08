import React from 'react';
import { styled } from 'styled-components';

import { Paragraph, Span } from '@typographies/TextElements';

const Container = styled.div`
	display: flex;
	margin: 10px 0px;
`;

const BookInfoText = styled(Paragraph)`
	flex: 1;
`;

const BookInfoField = styled(Span)`
	width: 120px;
	display: inline-block;
`;

interface IBookInfoDescriptionProps {
	field: string;
	text?: string;
}

function BookInfoDescription({
	field,
	text,
}: IBookInfoDescriptionProps): JSX.Element {
	return (
		<Container>
			<BookInfoField variant="article.field" $lineHeight={1.7}>
				{field}
			</BookInfoField>
			<BookInfoText $lineHeight={1.7}>{text || ''}</BookInfoText>
		</Container>
	);
}

export default BookInfoDescription;
