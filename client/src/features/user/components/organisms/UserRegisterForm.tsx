import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@redux/store';

import { ROUTES } from '@constants/routes';

import { SecondaryButton } from '@buttons';
import UserFormField from '../molecules/UserFormField';

import { clearRegisterStatus } from '../../userSlice';
import { registerUser } from '../../apis/userApi';
import useUserInput from '../../hooks/useUserInput';
import {
	validateEmail,
	validateNickname,
	validatePassword,
	validatePasswordConfirm,
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
	gap: 5px 0px;
`;

function UserRegisterForm(): JSX.Element {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const email = useUserInput('', validateEmail);
	const nickname = useUserInput('', validateNickname);
	const password = useUserInput('', validatePassword);
	const passwordConfirm = useUserInput('', value =>
		validatePasswordConfirm(value, password.value),
	);

	const checkValidation = (): boolean => {
		email.validateInput();
		nickname.validateInput();
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
			registerUser({
				email: email.value,
				nickname: nickname.value,
				password: password.value,
				passwordConfirm: passwordConfirm.value,
			}),
		);

		if (registerUser.fulfilled.match(response)) {
			alert('회원가입이 완료되었습니다!👏 로그인 해주세요.');
			navigate(ROUTES.USER.LOGIN);
		} else if (registerUser.rejected.match(response)) {
			const result = response.payload;

			if (result) {
				if (result.status === 409) {
					email.setError(result.message);
				} else {
					alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
				}
			}
		}
	};

	useEffect(() => {
		return () => {
			dispatch(clearRegisterStatus());
		};
	}, [dispatch]);

	return (
		<Form onSubmit={handleSubmit}>
			<InputContainer>
				<UserFormField
					label="이메일"
					type="text"
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
					label="비밀번호"
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
				<SecondaryButton type="submit">가입하기</SecondaryButton>
			</ButtonContainer>
		</Form>
	);
}

export default UserRegisterForm;
