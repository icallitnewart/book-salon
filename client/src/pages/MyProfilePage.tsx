import React from 'react';

import PageTemplate from '@components/templates/PageTemplate';
import MyPageLayoutTemplate from '@components/templates/MyPageLayoutTemplate';
import UserMyProfileTemplate from '@features/user/components/templates/UserMyProfileTemplate';

function MyProfilePage(): JSX.Element {
	return (
		<PageTemplate>
			<MyPageLayoutTemplate>
				<UserMyProfileTemplate />
			</MyPageLayoutTemplate>
		</PageTemplate>
	);
}

export default MyProfilePage;
