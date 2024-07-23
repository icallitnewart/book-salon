import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { handleApiError } from '@utils/errorHandler';
import { ROUTES } from '@constants/routes';

import useInputWithError from '@hooks/useInputWithError';

import { PrimaryButton } from '@buttons';
import UserErrorMessage from '../atoms/UserErrorMessage';
import UserFormField from '../molecules/UserFormField';

import useLoginUser from '../../hooks/useLoginUser';
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
	const location = useLocation();
	const navigate = useNavigate();
	const { loginUser, isError, updateAuthQueryDataAfterMutation } =
		useLoginUser();
	const [loginError, setLoginError] = React.useState('');
	const email = useInputWithError('', validateEmail);
	const password = useInputWithError('', validateLoginPassword);

	const checkValidation = (): boolean => {
		const fields = [email, password];
		fields.forEach(field => field.validateInput());
		return fields.every(field => field.isValidRef.current);
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

		loginUser(credentials, {
			onSuccess: user => {
				updateAuthQueryDataAfterMutation(user);
				alert('로그인에 성공하셨습니다.');
				navigateAfterLogin();
			},
			onError: err => {
				const error = handleApiError(err);
				if (error.status === 401) setLoginError(error.message);
				else alert('로그인에 실패하였습니다. 다시 시도해주세요.');
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
				{isError && loginError && <UserErrorMessage error={loginError} />}
			</ButtonContainer>
		</Form>
	);
}

export default UserLoginForm;
