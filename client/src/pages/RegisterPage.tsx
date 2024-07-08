import React from 'react';

import PageTemplate from '@components/templates/PageTemplate';
import RegisterTemplate from '@features/user/components/templates/RegisterTemplate';

function RegisterPage(): JSX.Element {
	return (
		<PageTemplate>
			<RegisterTemplate />
		</PageTemplate>
	);
}

export default RegisterPage;
