import React from 'react';
import styled from 'styled-components';

import useUserInput from '../../hooks/useUserInput';
import UserButton from '../atoms/UserButton';
import InputField from '../molecules/UserInputField';

const Form = styled.form`
	width: 100%;
`;

const InputContainer = styled.div`
	margin-bottom: 20px;
`;

function RegisterForm(): JSX.Element {
	const emailInput = useUserInput('');
	const nicknameInput = useUserInput('');
	const passwordInput = useUserInput('');
	const confirmPasswordInput = useUserInput('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<Form onSubmit={handleSubmit}>
			<InputContainer>
				<InputField
					label="이메일"
					type="email"
					id="email"
					name="email"
					value={emailInput.value}
					onChange={emailInput.handleChange}
					error={emailInput.error}
				/>
				<InputField
					label="닉네임"
					type="text"
					id="nickname"
					name="nickname"
					placeholder="2~6자 (특수문자, 공백 제외)"
					value={nicknameInput.value}
					onChange={nicknameInput.handleChange}
					error={nicknameInput.error}
				/>
				<InputField
					label="비밀번호"
					type="password"
					id="password"
					name="password"
					placeholder="8~16자 (영문, 숫자, 특수문자 포함)"
					value={passwordInput.value}
					onChange={passwordInput.handleChange}
					error={passwordInput.error}
				/>
				<InputField
					label="비밀번호 확인"
					type="password"
					id="confirmPassword"
					name="confirmPassword"
					value={confirmPasswordInput.value}
					onChange={confirmPasswordInput.handleChange}
					error={confirmPasswordInput.error}
				/>
			</InputContainer>
			<UserButton type="submit" text="가입하기" />
		</Form>
	);
}

export default RegisterForm;
