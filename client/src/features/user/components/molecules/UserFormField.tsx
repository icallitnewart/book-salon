import React from 'react';
import { styled } from 'styled-components';

import { PrimaryInput as UserInput } from '@inputs';
import UserInputLabel from '../atoms/UserInputLabel';
import UserErrorMessage from '../atoms/UserErrorMessage';

import { IUserFormFieldProps } from '../../types/userProps';

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
