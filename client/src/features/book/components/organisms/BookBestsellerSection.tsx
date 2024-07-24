import React from 'react';

import AsyncBoundary from '@components/organisms/AsyncBoundary';
import MainSectionLayout from '@components/organisms/MainSectionLayout';
import BookBestsellerCardList from './BookBestsellerCardList';

function BookBestsellerSection(): JSX.Element {
	return (
		<MainSectionLayout title="This week's bestseller">
			<AsyncBoundary>
				<BookBestsellerCardList />
			</AsyncBoundary>
		</MainSectionLayout>
	);
}

export default BookBestsellerSection;
