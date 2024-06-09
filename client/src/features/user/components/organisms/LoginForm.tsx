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

function LoginForm(): JSX.Element {
	const emailInput = useUserInput('');
	const passwordInput = useUserInput('');

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
					label="비밀번호"
					type="password"
					id="password"
					name="password"
					value={passwordInput.value}
					onChange={passwordInput.handleChange}
					error={passwordInput.error}
				/>
			</InputContainer>
			<UserButton type="submit" text="로그인" />
		</Form>
	);
}

export default LoginForm;
