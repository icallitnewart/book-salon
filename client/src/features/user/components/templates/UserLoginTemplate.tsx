import React from 'react';

import UserLoginForm from '../organisms/UserLoginForm';
import UserLayoutTemplate from './UserLayoutTemplate';

function UserLoginTemplate(): JSX.Element {
	return (
		<UserLayoutTemplate title="로그인">
			<UserLoginForm />
		</UserLayoutTemplate>
	);
}

export default UserLoginTemplate;
