import React from 'react';

import PageTemplate from '../shared/components/templates/PageTemplate';
import MyProfileTemplate from '../features/user/components/templates/MyProfileTemplate';

function MyProfilePage(): JSX.Element {
	return (
		<PageTemplate>
			<MyProfileTemplate />
		</PageTemplate>
	);
}

export default MyProfilePage;
