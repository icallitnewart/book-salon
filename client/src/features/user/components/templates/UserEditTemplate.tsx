import React from 'react';

import UserEditForm from '../organisms/UserEditForm';
import UserTemplate from './UserTemplate';

function UserEditTemplate(): JSX.Element {
	return (
		<UserTemplate title="회원 정보 수정">
			<UserEditForm />
		</UserTemplate>
	);
}

export default UserEditTemplate;
