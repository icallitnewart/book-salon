import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@redux/store';

import { ROUTES } from '@constants/routes';

import TextButton from '@buttons/TextButton';
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
	const user = useAppSelector(state => state.user.userInfo);
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
				<TextButton type="button" variant="black" onClick={moveToProfileEdit}>
					회원 정보 수정
				</TextButton>
				<TextButton type="button" variant="grey" onClick={handleLogout}>
					로그아웃
				</TextButton>
			</ButtonContainer>
		</Container>
	);
}

export default UserMyProfileContent;
