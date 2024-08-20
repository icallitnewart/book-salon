import React from 'react';

import UserLayoutTemplate from './UserLayoutTemplate';
import UserMyProfileContent from '../organisms/UserMyProfileContent';

function UserMyProfileTemplate(): JSX.Element {
	return (
		<UserLayoutTemplate title="나의 정보">
			<UserMyProfileContent />
		</UserLayoutTemplate>
	);
}

export default UserMyProfileTemplate;
