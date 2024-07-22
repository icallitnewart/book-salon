import React from 'react';

import { SubtleButton } from '@buttons';
import useLogoutUser from '@features/user/hooks/useLogoutUser';

function UserLogoutButton() {
	const { mutate: logoutUser } = useLogoutUser();

	return (
		<SubtleButton type="button" onClick={logoutUser}>
			로그아웃
		</SubtleButton>
	);
}

export default UserLogoutButton;
