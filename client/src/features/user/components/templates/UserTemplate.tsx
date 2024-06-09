import React from 'react';
import styled from 'styled-components';

import UserTitle from '../atoms/UserTitle';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	width: 100%;
	padding: 70px 0px 100px;
`;

const FormContainer = styled.div`
	width: 350px;
`;

interface IUserTemplateProps {
	children: React.ReactElement;
	title: string;
}

function UserTemplate({ children, title }: IUserTemplateProps): JSX.Element {
	return (
		<Container>
			<UserTitle title={title} />
			<FormContainer>{children}</FormContainer>
		</Container>
	);
}

export default UserTemplate;
