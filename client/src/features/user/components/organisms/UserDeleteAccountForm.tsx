import React from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@constants/routes';

import useInputWithError from '@hooks/useInputWithError';
import useDeleteUser from '@features/user/hooks/useDeleteUser';
import { handleApiError } from '@utils/errorHandler';

import {
	SecondaryButton as SubmitButton,
	SubtleButton as CancelButton,
} from '@buttons';
import UserFormField from '../molecules/UserFormField';

import { validateVerifyPassword } from '../../utils/userValidator';

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

interface IUserDeleteAccountFormProps {
	closeUserDeleteAccountForm: () => void;
}

function UserDeleteAccountForm({
	closeUserDeleteAccountForm,
}: IUserDeleteAccountFormProps): JSX.Element {
	const navigate = useNavigate();
	const { deleteUser, initialiseQueriesAfterMutation, isPending } =
		useDeleteUser();
	const password = useInputWithError('', validateVerifyPassword);

	const checkValidation = (): boolean => {
		password.validateInput();
		return password.isValidRef.current;
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const isSubmit = checkValidation();
		if (!isSubmit) return;

		if (window.confirm('정말로 탈퇴하시겠습니까?')) {
			const formData = {
				password: password.value,
			};

			deleteUser(formData, {
				onSuccess: () => {
					initialiseQueriesAfterMutation();
					alert(
						'성공적으로 회원탈퇴가 되었습니다. 그동안 이용해주셔서 감사합니다.',
					);
					navigate(ROUTES.MAIN);
				},
				onError: error => {
					const { status, message, field } = handleApiError(error);

					if (status === 401 && field === 'password') {
						password.setError(message);
					} else {
						alert('회원탈퇴에 실패하였습니다. 다시 시도해주세요.');
					}
				},
			});
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<InputContainer>
				<UserFormField
					label="비밀번호"
					type="password"
					id="password"
					name="password"
					placeholder="본인 확인을 위해 비밀번호를 입력해주세요."
					value={password.value}
					onChange={password.handleChange}
					error={password.error}
				/>
			</InputContainer>
			<ButtonContainer>
				<SubmitButton
					type="submit"
					$hoverBgColor="crimson"
					isPending={isPending}
				>
					확인
				</SubmitButton>
				<CancelButton type="button" onClick={closeUserDeleteAccountForm}>
					취소
				</CancelButton>
			</ButtonContainer>
		</Form>
	);
}

export default UserDeleteAccountForm;
