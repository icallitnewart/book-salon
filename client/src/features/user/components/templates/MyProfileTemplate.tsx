import React from 'react';

import UserTemplate from './UserTemplate';
import MyProfile from '../organisms/MyProfile';

function MyProfileTemplate(): JSX.Element {
	return (
		<UserTemplate title="나의 정보">
			<MyProfile />
		</UserTemplate>
	);
}

export default MyProfileTemplate;
