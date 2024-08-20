import React from 'react';
import { styled } from 'styled-components';

const Title = styled.h1`
	width: 100%;
	text-align: center;
	margin-bottom: 50px;

	font-family: var(--main-font-kor);
	font-size: 30px;
	font-weight: 900;
	letter-spacing: -0.5px;
`;

interface IUserTitleProps {
	title: string;
}

function UserTitle({ title }: IUserTitleProps): JSX.Element {
	return <Title>{title}</Title>;
}

export default UserTitle;
