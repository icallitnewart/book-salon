import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../../redux/store';

import UserButton from '../atoms/UserButton';
import UserInfoField from '../molecules/UserInfoField';

const Container = styled.form`
	width: 100%;
	padding-top: 5px;
`;

const InfoContainer = styled.div`
	margin-bottom: 40px;
`;

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

function MyProfile(): JSX.Element {
	const user = useAppSelector(state => state.user.userInfo);

	return (
		<Container>
			<InfoContainer>
				<UserInfoField label="이메일" value={user?.email} />
				<UserInfoField label="닉네임" value={user?.nickname} />
			</InfoContainer>
			<ButtonContainer>
				<UserButton type="button" text="회원 정보 수정" />
				<UserButton
					type="button"
					text="회원 탈퇴"
					bgColor="#aaa"
					hoverBgColor="crimson"
					hoverTextColor="#fff"
				/>
			</ButtonContainer>
		</Container>
	);
}

export default MyProfile;
