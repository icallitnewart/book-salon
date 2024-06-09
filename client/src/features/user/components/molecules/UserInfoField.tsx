import React from 'react';
import styled from 'styled-components';

import UserInfoLabel from '../atoms/UserInfoLabel';
import UserInfoValue from '../atoms/UserInfoValue';

const Container = styled.div`
	width: 100%;
	height: 35px;
	display: flex;
	align-items: center;
	margin-bottom: 10px;
`;

interface IUserInfoFieldProps {
	label: string;
	value: string;
}

function UserInfoField({ label, value }: IUserInfoFieldProps): JSX.Element {
	return (
		<Container>
			<UserInfoLabel label={label} />
			<UserInfoValue value={value} />
		</Container>
	);
}

export default UserInfoField;
