import React from 'react';

import PageTemplate from '@components/templates/PageTemplate';
import LoginTemplate from '@features/user/components/templates/LoginTemplate';

function LoginPage(): JSX.Element {
	return (
		<PageTemplate>
			<LoginTemplate />
		</PageTemplate>
	);
}

export default LoginPage;
