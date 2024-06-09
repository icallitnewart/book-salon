import React from 'react';
import { styled } from 'styled-components';

import { IInputFieldProps } from '../../types/userProps';

import UserLabel from '../atoms/UserLabel';
import UserInput from '../atoms/UserInput';
import UserErrorMessage from '../atoms/UserErrorMessage';

const Container = styled.div`
	width: 100%;
	margin-bottom: 10px;
`;

function UserInputField({
	label,
	type,
	id,
	name,
	value,
	placeholder = '',
	onChange,
	error,
}: IInputFieldProps): JSX.Element {
	return (
		<Container>
			<UserLabel htmlFor={id}>{label}</UserLabel>
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

export default UserInputField;
