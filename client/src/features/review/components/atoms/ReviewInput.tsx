import React from 'react';
import { styled } from 'styled-components';

const Input = styled.input`
	height: 50px;
	padding: 0px 12px;
	border-radius: 5px;
	border: 1px solid #ddd;
	box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.05);

	line-height: 1.6;
	font-size: 1.6rem;
	font-family: var(--main-font-kor);
	color: #444;
	outline: none;

	&:focus {
		border: 1px solid #bbb;
	}

	&::placeholder {
		color: #999;
	}
`;

interface IReviewInputProps {
	placeholder?: string;
	ariaLabel?: string;
	maxLength?: number;
}

function ReviewInput({
	placeholder,
	ariaLabel,
	maxLength,
}: IReviewInputProps): JSX.Element {
	return (
		<Input
			type="text"
			placeholder={placeholder}
			aria-label={ariaLabel}
			maxLength={maxLength}
		/>
	);
}

export default ReviewInput;
