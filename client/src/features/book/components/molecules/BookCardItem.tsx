import React from 'react';
import { styled } from 'styled-components';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';

import { IBookProfilePreview } from '@features/book/types/bookData';
import BookProfilePreview from './BookProfilePreview';

const Article = styled.article`
	width: calc(100% / 6);
	max-width: 134px;
	height: 310px;
`;

const WIDTH = '134px';

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
				$width={WIDTH}
				$titleMargin="13px 0 6px"
				$imgBorderRadius="5px"
			/>
		</Article>
	);
}

export default BookCardItem;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px 0px;
`;

BookCardItem.Skeleton = function () {
	return (
		<Container>
			<Skeleton width={WIDTH} height={200} />
			<Skeleton width={WIDTH} height={20} />
			<Skeleton width={WIDTH} height={15} />
		</Container>
	);
};
