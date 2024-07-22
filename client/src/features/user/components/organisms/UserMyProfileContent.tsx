import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@redux/store';

import { ROUTES } from '@constants/routes';
import useAuthQueryData from '@hooks/useAuthQueryData';

import { SecondaryButton, SubtleButton } from '@buttons';
import UserLabelledText from '../molecules/UserLabelledText';

import { clearLogoutStatus } from '../../userSlice';
import { logoutUser } from '../../apis/userApi';

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
	const dispatch = useAppDispatch();
	const { user } = useAuthQueryData();
	const navigate = useNavigate();
	const moveToProfileEdit = () => {
		navigate(ROUTES.USER.PROFILE_EDIT);
	};

	const handleLogout = async () => {
		const response = await dispatch(logoutUser());

		if (logoutUser.fulfilled.match(response)) {
			alert('로그아웃 되었습니다.');
			navigate(ROUTES.MAIN);
		} else if (logoutUser.rejected.match(response)) {
			alert('로그아웃에 실패했습니다.');
		}
	};

	useEffect(() => {
		return () => {
			dispatch(clearLogoutStatus());
		};
	}, [dispatch]);

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
				<SecondaryButton type="button" onClick={moveToProfileEdit}>
					회원 정보 수정
				</SecondaryButton>
				<SubtleButton type="button" onClick={handleLogout}>
					로그아웃
				</SubtleButton>
			</ButtonContainer>
		</Container>
	);
}

export default UserMyProfileContent;
