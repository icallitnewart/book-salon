import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@redux/store';

import { ROUTES } from '@constants/routes';

import TextButton from '@buttons/TextButton';
import UserFormField from '../molecules/UserFormField';

import useUserInput from '../../hooks/useUserInput';
import { updateUser } from '../../apis/userApi';
import { clearUpdateStatus } from '../../userSlice';
import {
	validateEmail,
	validateNickname,
	validatePassword,
	validatePasswordConfirm,
	validateVerifyPassword,
} from '../../utils/userValidator';

const Form = styled.form`
	width: 100%;
`;

const InputContainer = styled.div`
	margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

interface IUserProfileEditFormProps {
	openUserDeleteAccountForm: () => void;
}

function UserProfileEditForm({
	openUserDeleteAccountForm,
}: IUserProfileEditFormProps): JSX.Element {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const user = useAppSelector(state => state.user.userInfo);
	const email = useUserInput(user?.email, validateEmail);
	const nickname = useUserInput(user?.nickname, validateNickname);
	const currentPassword = useUserInput('', validateVerifyPassword);
	const password = useUserInput('', value =>
		validatePassword(value, value !== ''),
	);
	const passwordConfirm = useUserInput('', value =>
		validatePasswordConfirm(value, password.value, password.value !== ''),
	);

	const checkValidation = (): boolean => {
		email.validateInput();
		nickname.validateInput();
		currentPassword.validateInput();
		password.validateInput();
		passwordConfirm.validateInput();

		return (
			email.isValidRef.current &&
			nickname.isValidRef.current &&
			currentPassword.isValidRef.current &&
			password.isValidRef.current &&
			passwordConfirm.isValidRef.current
		);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const isSubmit = checkValidation();
		if (!isSubmit) return;

		const response = await dispatch(
			updateUser({
				email: email.value,
				nickname: nickname.value,
				currentPassword: currentPassword.value,
				password: password.value,
				passwordConfirm: passwordConfirm.value,
			}),
		);

		if (updateUser.fulfilled.match(response)) {
			alert('성공적으로 회원정보가 수정되었습니다.');
			navigate(ROUTES.USER.MY_PROFILE);
		} else if (updateUser.rejected.match(response)) {
			const result = response.payload;

			if (result) {
				if (result.status === 409 && result.field === 'email') {
					email.setError(result.message);
				} else if (
					result.status === 401 &&
					result.field === 'currentPassword'
				) {
					currentPassword.setError(result.message);
				} else {
					alert('회원정보 수정에 실패하였습니다. 다시 시도해주세요.');
				}
			}
		}
	};

	useEffect(() => {
		return () => {
			dispatch(clearUpdateStatus());
		};
	}, [dispatch]);

	return (
		<Form onSubmit={handleSubmit}>
			<InputContainer>
				<UserFormField
					label="이메일"
					type="email"
					id="email"
					name="email"
					value={email.value}
					onChange={email.handleChange}
					error={email.error}
				/>
				<UserFormField
					label="닉네임"
					type="text"
					id="nickname"
					name="nickname"
					placeholder="2~6자 (특수문자, 공백 제외)"
					value={nickname.value}
					onChange={nickname.handleChange}
					error={nickname.error}
				/>
				<UserFormField
					label="현재 비밀번호"
					type="password"
					id="currentPassword"
					name="currentPassword"
					value={currentPassword.value}
					onChange={currentPassword.handleChange}
					error={currentPassword.error}
				/>
				<UserFormField
					label="새 비밀번호"
					type="password"
					id="password"
					name="password"
					placeholder="8~16자 (영문, 숫자, 특수문자 포함)"
					value={password.value}
					onChange={password.handleChange}
					error={password.error}
				/>
				<UserFormField
					label="비밀번호 확인"
					type="password"
					id="passwordConfirm"
					name="passwordConfirm"
					value={passwordConfirm.value}
					onChange={passwordConfirm.handleChange}
					error={passwordConfirm.error}
				/>
			</InputContainer>
			<ButtonContainer>
				<TextButton type="submit" variant="black">
					수정하기
				</TextButton>
				<TextButton
					type="button"
					variant="grey"
					$hoverBgColor="crimson"
					onClick={openUserDeleteAccountForm}
				>
					탈퇴하기
				</TextButton>
			</ButtonContainer>
		</Form>
	);
}

export default UserProfileEditForm;
