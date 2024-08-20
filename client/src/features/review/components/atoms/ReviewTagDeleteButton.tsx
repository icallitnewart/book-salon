import React from 'react';
import { styled } from 'styled-components';

const Button = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0px 6px;
	transform: translateX(-2.5px);
	cursor: pointer;

	background-color: #f0f0f0;
	border: none;
	border-radius: 0px 3px 3px 0px;

	line-height: 1.1;
	font-size: 1.3rem;
	font-weight: 600;
	font-family: var(--main-font-eng);
	color: #888;
`;

interface IReviewTagDeleteButtonProps {
	handleClick: () => void;
}

function ReviewTagDeleteButton({
	handleClick,
}: IReviewTagDeleteButtonProps): JSX.Element {
	return (
		<Button type="button" onClick={handleClick}>
			x
		</Button>
	);
}

export default ReviewTagDeleteButton;
