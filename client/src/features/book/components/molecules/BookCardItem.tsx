import React from 'react';
import { styled } from 'styled-components';

import { IBookProfilePreview } from '@features/book/types/bookData';
import BookProfilePreview from './BookProfilePreview';

const Article = styled.article`
	width: calc(100% / 6);
	max-width: 134px;
	height: 310px;
`;

function BookCardItem({
	title,
	author,
	cover,
	link,
}: IBookProfilePreview): JSX.Element {
	return (
		<Article>
			<BookProfilePreview
				title={title}
				author={author}
				cover={cover}
				link={link}
				$width="134px"
				$titleMargin="13px 0 6px"
				$imgBorderRadius="5px"
			/>
		</Article>
	);
}

export default BookCardItem;
