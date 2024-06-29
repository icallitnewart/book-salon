import React, { useState } from 'react';

import ProfileEditForm from '../organisms/ProfileEditForm';
import DeleteAccountForm from '../organisms/DeleteAccountForm';
import UserTemplate from './UserTemplate';

function ProfileEditTemplate(): JSX.Element {
	const [showDeleteAccountForm, setShowDeleteAccountForm] = useState(false);

	return (
		<UserTemplate
			title={showDeleteAccountForm ? '회원 탈퇴' : '회원 정보 수정'}
		>
			{showDeleteAccountForm ? (
				<DeleteAccountForm
					closeDeleteAccountForm={() => setShowDeleteAccountForm(false)}
				/>
			) : (
				<ProfileEditForm
					openDeleteAccountForm={() => setShowDeleteAccountForm(true)}
				/>
			)}
		</UserTemplate>
	);
}

export default ProfileEditTemplate;
