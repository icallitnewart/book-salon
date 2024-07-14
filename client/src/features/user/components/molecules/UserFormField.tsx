import React from 'react';
import { styled } from 'styled-components';

import { IUserFormFieldProps } from '../../types/userProps';

import UserInputLabel from '../atoms/UserInputLabel';
import UserInput from '../atoms/UserInput';
import UserErrorMessage from '../atoms/UserErrorMessage';

const Container = styled.div`
	width: 100%;
	margin-bottom: 10px;
`;

function UserFormField({
	label,
	type,
	id,
	name,
	value,
	placeholder,
	onChange,
	error,
}: IUserFormFieldProps): JSX.Element {
	return (
		<Container>
			<UserInputLabel htmlFor={id}>{label}</UserInputLabel>
			<UserInput
				type={type}
				id={id}
				name={name}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
			/>
			<UserErrorMessage error={error} />
		</Container>
	);
}

export default UserFormField;
