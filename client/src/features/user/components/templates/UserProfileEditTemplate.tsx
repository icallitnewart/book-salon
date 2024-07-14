import React, { useState } from 'react';

import UserProfileEditForm from '../organisms/UserProfileEditForm';
import UserDeleteAccountForm from '../organisms/UserDeleteAccountForm';
import UserLayoutTemplate from './UserLayoutTemplate';

function UserProfileEditTemplate(): JSX.Element {
	const [showDeleteAccountForm, setShowDeleteAccountForm] = useState(false);

	return (
		<UserLayoutTemplate
			title={showDeleteAccountForm ? '회원 탈퇴' : '회원 정보 수정'}
		>
			{showDeleteAccountForm ? (
				<UserDeleteAccountForm
					closeUserDeleteAccountForm={() => setShowDeleteAccountForm(false)}
				/>
			) : (
				<UserProfileEditForm
					openUserDeleteAccountForm={() => setShowDeleteAccountForm(true)}
				/>
			)}
		</UserLayoutTemplate>
	);
}

export default UserProfileEditTemplate;
