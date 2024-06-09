import React from 'react';

import RegisterForm from '../organisms/RegisterForm';
import UserTemplate from './UserTemplate';

function RegisterTemplate(): JSX.Element {
	return (
		<UserTemplate title="회원가입">
			<RegisterForm />
		</UserTemplate>
	);
}

export default RegisterTemplate;
