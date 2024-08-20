import React from 'react';
import { styled } from 'styled-components';

const InfoText = styled.div`
	display: flex;
	align-items: center;
	flex: 2.5;
	height: 100%;

	color: #222;
	font-family: var(--main-font-kor);
	font-size: 16px;
	letter-spacing: -0.5px;
`;

interface IUserInfoTextProps {
	text?: string;
	id: string;
}

function UserInfoText({ text = '', id }: IUserInfoTextProps): JSX.Element {
	return <InfoText aria-labelledby={id}>{text}</InfoText>;
}

export default UserInfoText;
