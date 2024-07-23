import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ROUTES } from '@constants/routes';
import { IUserRegister } from '@features/user/types/userData';

import useRegisterUser from '@features/user/hooks/useRegisterUser';
import { handleApiError } from '@utils/errorHandler';

import { SecondaryButton } from '@buttons';
import UserFormField from '../molecules/UserFormField';

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
	const navigate = useNavigate();
	const { registerUser } = useRegisterUser();
	const email = useUserInput('', validateEmail);
	const nickname = useUserInput('', validateNickname);
	const password = useUserInput('', validatePassword);
	const passwordConfirm = useUserInput('', value =>
		validatePasswordConfirm(value, password.value),
	);

	const checkValidation = (): boolean => {
		const fields = [email, nickname, password, passwordConfirm];
		fields.forEach(field => field.validateInput());
		return fields.every(field => field.isValidRef.current);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const isSubmit = checkValidation();
		if (!isSubmit) return;

		const formData: IUserRegister = {
			email: email.value,
			nickname: nickname.value,
			password: password.value,
			passwordConfirm: passwordConfirm.value,
		};

		registerUser(formData, {
			onSuccess: () => {
				alert('회원가입이 완료되었습니다👏! 로그인 해주세요.');
				navigate(ROUTES.USER.LOGIN);
			},
			onError: error => {
				const { status, message } = handleApiError(error);

				if (status === 409) {
					email.setError(message);
				} else {
					alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
				}
			},
		});
	};

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
