import React from 'react';

import PageTemplate from '@components/templates/PageTemplate';
import MyPageLayoutTemplate from '@components/templates/MyPageLayoutTemplate';
import UserProfileEditTemplate from '@features/user/components/templates/UserProfileEditTemplate';

function MyProfileEditPage(): JSX.Element {
	return (
		<PageTemplate>
			<MyPageLayoutTemplate>
				<UserProfileEditTemplate />
			</MyPageLayoutTemplate>
		</PageTemplate>
	);
}

export default MyProfileEditPage;
