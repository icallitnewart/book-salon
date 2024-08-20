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

const Content = styled.div`
	width: 350px;
`;

interface IUserLayoutTemplateProps {
	children: React.ReactElement;
	title: string;
}

function UserLayoutTemplate({
	children,
	title,
}: IUserLayoutTemplateProps): JSX.Element {
	return (
		<Container>
			<UserTitle title={title} />
			<Content>{children}</Content>
		</Container>
	);
}

export default UserLayoutTemplate;
