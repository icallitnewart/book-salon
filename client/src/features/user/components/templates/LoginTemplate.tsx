import React from 'react';

import LoginForm from '../organisms/LoginForm';
import UserTemplate from './UserTemplate';

function LoginTemplate(): JSX.Element {
	return (
		<UserTemplate title="로그인">
			<LoginForm />
		</UserTemplate>
	);
}

export default LoginTemplate;
