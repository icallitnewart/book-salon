import React from 'react';

import PageTemplate from '@components/templates/PageTemplate';
import UserProfileEditTemplate from '@features/user/components/templates/UserProfileEditTemplate';

function MyProfileEditPage(): JSX.Element {
	return (
		<PageTemplate>
			<UserProfileEditTemplate />
		</PageTemplate>
	);
}

export default MyProfileEditPage;
