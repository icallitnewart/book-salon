import React from 'react';

import PageTemplate from '@components/templates/PageTemplate';
import MyPageLayoutTemplate from '@components/templates/MyPageLayoutTemplate';
import BookLikeCardList from '@features/book/components/organisms/BookLikeCardList';

function LikedBookPage(): JSX.Element {
	return (
		<PageTemplate>
			<MyPageLayoutTemplate>
				<BookLikeCardList />
			</MyPageLayoutTemplate>
		</PageTemplate>
	);
}

export default LikedBookPage;
