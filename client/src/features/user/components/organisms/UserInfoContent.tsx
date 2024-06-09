import React from 'react';
import styled from 'styled-components';

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

function UserEditForm(): JSX.Element {
	return (
		<Container>
			<InfoContainer>
				<UserInfoField label="이메일" value="testEmail@test.com" />
				<UserInfoField label="닉네임" value="테스트 닉네임" />
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

export default UserEditForm;
