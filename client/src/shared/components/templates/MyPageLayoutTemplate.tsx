import React from 'react';
import styled from 'styled-components';

import MyPageSideNavigation from '@components/organisms/MyPageSideNavigation';

const Container = styled.div`
	display: flex;
	width: 100%;
`;

const Content = styled.main`
	flex: 1;
	padding: 30px;
`;

interface IMyPageLayoutTemplateProps {
	children: React.ReactElement;
}

function MyPageLayoutTemplate({
	children,
}: IMyPageLayoutTemplateProps): JSX.Element {
	return (
		<Container>
			<MyPageSideNavigation />
			<Content>{children}</Content>
		</Container>
	);
}

export default MyPageLayoutTemplate;
