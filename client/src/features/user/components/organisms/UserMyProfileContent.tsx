import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ROUTES } from '@constants/routes';
import useAuthUser from '@features/user/hooks/useAuthUser';

import { SecondaryButton as UserEditButton } from '@buttons';
import UserLabelledText from '../molecules/UserLabelledText';
import UserLogoutButton from '../atoms/UserLogoutButton';

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

function UserMyProfileContent(): JSX.Element {
	const { data: user } = useAuthUser({
		select: data => data.user,
	});
	const navigate = useNavigate();
	const moveToProfileEdit = () => {
		navigate(ROUTES.USER.PROFILE_EDIT);
	};

	return (
		<Container>
			<InfoContainer>
				<UserLabelledText label="이메일" id="email-label" text={user?.email} />
				<UserLabelledText
					label="닉네임"
					id="nickname-label"
					text={user?.nickname}
				/>
			</InfoContainer>
			<ButtonContainer>
				<UserEditButton type="button" onClick={moveToProfileEdit}>
					회원 정보 수정
				</UserEditButton>
				<UserLogoutButton />
			</ButtonContainer>
		</Container>
	);
}

export default UserMyProfileContent;
