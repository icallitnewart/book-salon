import React from 'react';

import PageTemplate from '@components/templates/PageTemplate';
import UserLoginTemplate from '@features/user/components/templates/UserLoginTemplate';

function LoginPage(): JSX.Element {
	return (
		<PageTemplate>
			<UserLoginTemplate />
		</PageTemplate>
	);
}

export default LoginPage;
