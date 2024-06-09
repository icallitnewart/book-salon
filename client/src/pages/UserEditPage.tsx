import React from 'react';

import PageTemplate from '../shared/components/templates/PageTemplate';
import UserEditTemplate from '../features/user/components/templates/UserEditTemplate';

function UserEditPage(): JSX.Element {
	return (
		<PageTemplate>
			<UserEditTemplate />
		</PageTemplate>
	);
}

export default UserEditPage;
