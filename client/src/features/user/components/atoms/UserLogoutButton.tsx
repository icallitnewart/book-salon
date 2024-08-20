import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import useLogoutUser from '@features/user/hooks/useLogoutUser';
import { handleApiError } from '@utils/errorHandler';

import { SubtleButton } from '@buttons';

function UserLogoutButton() {
	const navigate = useNavigate();
	const { logoutUser, initialiseQueriesAfterMutation } = useLogoutUser();

	const handleLogout = () => {
		logoutUser(undefined, {
			onSuccess: () => {
				initialiseQueriesAfterMutation();
				alert('로그아웃 되었습니다.');
				navigate(ROUTES.MAIN);
			},
			onError: err => {
				const error = handleApiError(err);

				if (error) {
					alert('로그아웃에 실패하였습니다. 다시 시도해주세요.');
				}
			},
		});
	};

	return (
		<SubtleButton type="button" onClick={handleLogout}>
			로그아웃
		</SubtleButton>
	);
}

export default UserLogoutButton;
