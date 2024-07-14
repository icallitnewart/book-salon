import React from 'react';

import UserRegisterForm from '../organisms/UserRegisterForm';
import UserLayoutTemplate from './UserLayoutTemplate';

function UserRegisterTemplate(): JSX.Element {
	return (
		<UserLayoutTemplate title="회원가입">
			<UserRegisterForm />
		</UserLayoutTemplate>
	);
}

export default UserRegisterTemplate;
