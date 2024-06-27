import React from 'react';

import ProfileEditForm from '../organisms/ProfileEditForm';
import UserTemplate from './UserTemplate';

function ProfileEditTemplate(): JSX.Element {
	return (
		<UserTemplate title="회원 정보 수정">
			<ProfileEditForm />
		</UserTemplate>
	);
}

export default ProfileEditTemplate;
