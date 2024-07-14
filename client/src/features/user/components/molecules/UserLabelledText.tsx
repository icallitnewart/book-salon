import React from 'react';
import styled from 'styled-components';

import UserTextLabel from '../atoms/UserTextLabel';
import UserInfoText from '../atoms/UserInfoText';

const Container = styled.div`
	width: 100%;
	height: 35px;
	display: flex;
	align-items: center;
	margin-bottom: 10px;
`;

interface IUserLabelledTextProps {
	label: string;
	text?: string;
}

function UserLabelledText({
	label,
	text,
}: IUserLabelledTextProps): JSX.Element {
	return (
		<Container>
			<UserTextLabel label={label} />
			<UserInfoText text={text} />
		</Container>
	);
}

export default UserLabelledText;
