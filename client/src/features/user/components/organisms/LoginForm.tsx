import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';

import useUserInput from '../../hooks/useUserInput';
import { loginUser } from '../../apis/loginApi';
import { clearLoginStatus } from '../../userSlice';
import {
	validateEmail,
	validateLoginPassword,
} from '../../utils/userValidator';

import UserButton from '../atoms/UserButton';
import UserErrorMessage from '../atoms/UserErrorMessage';
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

function LoginForm(): JSX.Element {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const error = useAppSelector(state => state.user.loginStatus.error);
	const email = useUserInput('', validateEmail);
	const password = useUserInput('', validateLoginPassword);

	const checkValidation = (): boolean => {
		if (email.error || password.error) return false;
		return true;
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const isSubmit = checkValidation();
		if (!isSubmit) return;

		const response = await dispatch(
			loginUser({ email: email.value, password: password.value }),
		);

		if (loginUser.fulfilled.match(response)) {
			alert('로그인에 성공하셨습니다.');
			navigate('/user/info');
		} else if (loginUser.rejected.match(response)) {
			const result = response.payload;

			if (result && result.status === 500) {
				alert('네트워크 에러가 발생하였습니다. 다시 시도해주세요.');
			}
		}
	};

	useEffect(() => {
		return () => {
			dispatch(clearLoginStatus());
		};
	}, [dispatch]);

	return (
		<Form onSubmit={handleSubmit}>
			<InputContainer>
				<InputField
					label="이메일"
					type="text"
					id="email"
					name="email"
					value={email.value}
					onChange={email.handleChange}
					error={email.error}
				/>
				<InputField
					label="비밀번호"
					type="password"
					id="password"
					name="password"
					value={password.value}
					onChange={password.handleChange}
					error={password.error}
				/>
			</InputContainer>
			<ButtonContainer>
				<UserButton type="submit" text="로그인" />
				{error && <UserErrorMessage error={error} />}
			</ButtonContainer>
		</Form>
	);
}

export default LoginForm;
