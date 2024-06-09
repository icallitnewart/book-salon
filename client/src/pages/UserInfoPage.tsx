import React from 'react';

import PageTemplate from '../shared/components/templates/PageTemplate';
import UserInfoTemplate from '../features/user/components/templates/UserInfoTemplate';

function UserInfoPage(): JSX.Element {
	return (
		<PageTemplate>
			<UserInfoTemplate />
		</PageTemplate>
	);
}

export default UserInfoPage;
