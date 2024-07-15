import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@redux/store';

import { ROUTES } from '@constants/routes';

import TextButton from '@buttons/TextButton';
import UserFormField from '../molecules/UserFormField';

import useUserInput from '../../hooks/useUserInput';
import { deleteUser } from '../../apis/userApi';
import { clearDeleteStatus } from '../../userSlice';
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
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const password = useUserInput('', validateVerifyPassword);

	const checkValidation = (): boolean => {
		password.validateInput();
		return password.isValidRef.current;
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const isSubmit = checkValidation();
		if (!isSubmit) return;

		if (window.confirm('정말로 탈퇴하시겠습니까?')) {
			const response = await dispatch(deleteUser(password.value));

			if (deleteUser.fulfilled.match(response)) {
				alert(
					'성공적으로 회원탈퇴가 되었습니다. 그동안 이용해주셔서 감사합니다.',
				);
				navigate(ROUTES.MAIN);
			} else if (deleteUser.rejected.match(response)) {
				const result = response.payload;
				if (result) {
					if (result.status === 401 && result.field === 'password') {
						password.setError('비밀번호가 일치하지 않습니다.');
					} else {
						alert('회원탈퇴에 실패하였습니다. 다시 시도해주세요.');
					}
				}
			}
		}
	};

	useEffect(() => {
		return () => {
			dispatch(clearDeleteStatus());
		};
	}, [dispatch]);

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
				<TextButton type="submit" variant="grey" $hoverBgColor="crimson">
					확인
				</TextButton>
				<TextButton
					type="button"
					variant="black"
					onClick={closeUserDeleteAccountForm}
				>
					취소
				</TextButton>
			</ButtonContainer>
		</Form>
	);
}

export default UserDeleteAccountForm;
