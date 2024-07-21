import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@redux/store';

import { ROUTES } from '@constants/routes';

import { PrimaryButton } from '@buttons';
import UserErrorMessage from '../atoms/UserErrorMessage';
import UserFormField from '../molecules/UserFormField';

import useUserInput from '../../hooks/useUserInput';
import { updateAuth } from '../../userSlice';

import { useLoginUser } from '../../hooks/useUserQueries';
import {
	validateEmail,
	validateLoginPassword,
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

function UserLoginForm(): JSX.Element {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const { mutate: loginUser, isError, loginError } = useLoginUser();
	const email = useUserInput('', validateEmail);
	const password = useUserInput('', validateLoginPassword);

	const checkValidation = (): boolean => {
		email.validateInput();
		password.validateInput();

		return email.isValidRef.current && password.isValidRef.current;
	};

	const navigateAfterLogin = () => {
		const from = location.state?.from;

		if (from && from.pathname !== ROUTES.USER.LOGIN) {
			navigate(from.pathname, { replace: true });
		} else {
			navigate(ROUTES.MAIN, { replace: true });
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const isSubmit = checkValidation();
		if (!isSubmit) return;

		const credentials = {
			email: email.value,
			password: password.value,
		};

		await loginUser(credentials, {
			onSuccess: user => {
				dispatch(updateAuth(user));
				alert('로그인에 성공하셨습니다.');
				navigateAfterLogin();
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
				<PrimaryButton type="submit">로그인</PrimaryButton>
				{isError && loginError?.status === 401 && (
					<UserErrorMessage error={loginError?.message} />
				)}
			</ButtonContainer>
		</Form>
	);
}

export default UserLoginForm;
