import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';

import { ROUTES } from '../../../../constants/routes';

import useUserInput from '../../hooks/useUserInput';
import { updateUser } from '../../apis/userApi';
import { clearUpdateStatus } from '../../userSlice';
import {
	validateEmail,
	validateNickname,
	validatePassword,
	validatePasswordConfirm,
} from '../../utils/userValidator';

import UserButton from '../atoms/UserButton';
import InputField from '../molecules/UserInputField';

const Form = styled.form`
	width: 100%;
`;

const InputContainer = styled.div`
	margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px 0px;
`;

function ProfileEditForm(): JSX.Element {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const user = useAppSelector(state => state.user.userInfo);
	const email = useUserInput(user?.email, validateEmail);
	const nickname = useUserInput(user?.nickname, validateNickname);
	const currentPassword = useUserInput('', validatePassword);
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
				<InputField
					label="이메일"
					type="email"
					id="email"
					name="email"
					value={email.value}
					onChange={email.handleChange}
					error={email.error}
				/>
				<InputField
					label="닉네임"
					type="text"
					id="nickname"
					name="nickname"
					placeholder="2~6자 (특수문자, 공백 제외)"
					value={nickname.value}
					onChange={nickname.handleChange}
					error={nickname.error}
				/>
				<InputField
					label="현재 비밀번호"
					type="password"
					id="currentPassword"
					name="currentPassword"
					placeholder="새 비밀번호로 변경시 필수 입력"
					value={currentPassword.value}
					onChange={currentPassword.handleChange}
					error={currentPassword.error}
				/>
				<InputField
					label="새 비밀번호"
					type="password"
					id="password"
					name="password"
					placeholder="8~16자 (영문, 숫자, 특수문자 포함)"
					value={password.value}
					onChange={password.handleChange}
					error={password.error}
				/>
				<InputField
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
				<UserButton type="submit" text="수정하기" />
			</ButtonContainer>
		</Form>
	);
}

export default ProfileEditForm;
