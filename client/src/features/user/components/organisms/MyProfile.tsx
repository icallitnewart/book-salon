import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@redux/store';

import { ROUTES } from '@constants/routes';

import { clearLogoutStatus } from '../../userSlice';
import { logoutUser } from '../../apis/userApi';

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
				<UserInfoField label="이메일" value={user?.email} />
				<UserInfoField label="닉네임" value={user?.nickname} />
			</InfoContainer>
			<ButtonContainer>
				<UserButton
					type="button"
					text="회원 정보 수정"
					handleClick={moveToProfileEdit}
				/>
				<UserButton
					type="button"
					text="로그아웃"
					bgColor="#aaa"
					hoverBgColor="var(--sub-color-darkgreen)"
					hoverTextColor="#fff"
					handleClick={handleLogout}
				/>
			</ButtonContainer>
		</Container>
	);
}

export default MyProfile;
