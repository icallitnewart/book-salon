import React from 'react';

import PageTemplate from '@components/templates/PageTemplate';
import ProfileEditTemplate from '@features/user/components/templates/ProfileEditTemplate';

function MyProfileEditPage(): JSX.Element {
	return (
		<PageTemplate>
			<ProfileEditTemplate />
		</PageTemplate>
	);
}

export default MyProfileEditPage;
