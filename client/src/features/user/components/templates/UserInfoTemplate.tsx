import React from 'react';

import UserTemplate from './UserTemplate';
import UserInfoContent from '../organisms/UserInfoContent';

function UserInfoTemplate(): JSX.Element {
	return (
		<UserTemplate title="나의 정보">
			<UserInfoContent />
		</UserTemplate>
	);
}

export default UserInfoTemplate;
