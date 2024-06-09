import React from 'react';
import styled from 'styled-components';

const InfoLabel = styled.div`
	display: flex;
	align-items: center;
	flex: 1;
	height: 100%;
	text-indent: 5px;

	color: #222;
	font-family: var(--main-font-kor);
	font-weight: bold;
	font-size: 16px;
	letter-spacing: -0.5px;
`;

interface IUserInfoLabelProps {
	label: string;
}

function UserInfoLabel({ label }: IUserInfoLabelProps): JSX.Element {
	return <InfoLabel>{label}</InfoLabel>;
}

export default UserInfoLabel;
