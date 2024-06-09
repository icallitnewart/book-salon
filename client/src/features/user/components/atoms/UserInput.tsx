import React from 'react';
import { styled } from 'styled-components';

import { IUserInputProps } from '../../types/userProps';

const Input = styled.input`
	width: 100%;
	height: 48px;
	padding: 10px 15px;

	color: #222;
	font-family: var(--main-font-eng) var(--main-font-kor);
	font-size: 16px;
	letter-spacing: -1px;
	border: 1px solid #eee;
	border-radius: 5px;

	&::placeholder {
		color: #aaa;
	}

	&:hover {
		outline: 1px solid #555;
	}
`;

function UserInput({
	type,
	id,
	name,
	value,
	placeholder = '',
	onChange,
}: IUserInputProps): JSX.Element {
	return (
		<Input
			type={type}
			id={id}
			name={name}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
}

export default UserInput;
