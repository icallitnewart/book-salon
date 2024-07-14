import React from 'react';

import PageTemplate from '@components/templates/PageTemplate';
import UserMyProfileTemplate from '@features/user/components/templates/UserMyProfileTemplate';

function MyProfilePage(): JSX.Element {
	return (
		<PageTemplate>
			<UserMyProfileTemplate />
		</PageTemplate>
	);
}

export default MyProfilePage;
