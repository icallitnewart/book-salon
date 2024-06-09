import React from 'react';
import { styled } from 'styled-components';

const InfoValue = styled.div`
	display: flex;
	align-items: center;
	flex: 2.5;
	height: 100%;

	color: #222;
	font-family: var(--main-font-kor);
	font-size: 16px;
	letter-spacing: -0.5px;
`;

interface IUserInfoValueProps {
	value: string;
}

function UserInfoValue({ value }: IUserInfoValueProps): JSX.Element {
	return <InfoValue>{value}</InfoValue>;
}

export default UserInfoValue;
