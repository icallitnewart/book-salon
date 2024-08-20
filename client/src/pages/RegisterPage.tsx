import React from 'react';

import PageTemplate from '@components/templates/PageTemplate';
import UserRegisterTemplate from '@features/user/components/templates/UserRegisterTemplate';

function RegisterPage(): JSX.Element {
	return (
		<PageTemplate>
			<UserRegisterTemplate />
		</PageTemplate>
	);
}

export default RegisterPage;
