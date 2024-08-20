import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { ROUTES } from '@constants/routes';

import { SpanWithStyles } from '@typographies';

const Container = styled.aside`
	position: relative;
	width: 220px;
	padding: 40px;
	border-right: 1px solid #eee;
`;

const Navigation = styled.nav`
	position: sticky;
	top: calc(var(--header-height) + 40px);
	left: 0;
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const NavItem = styled(NavLink)`
	display: flex;
	justify-content: center;
	width: 100%;
	height: 40px;

	&.active span {
		color: var(--sub-color-darkgreen);
	}
`;

const NavText = styled(SpanWithStyles).attrs({
	$hoverColor: 'var(--sub-color-darkgreen)',
	$color: '#333',
})`
	text-transform: uppercase;
`;

function MyPageSideNavigation(): JSX.Element {
	return (
		<Container>
			<Navigation>
				<NavItem to={ROUTES.USER.MY_PROFILE} end>
					<NavText variant="article-subtitle-sm">나의 프로필</NavText>
				</NavItem>
				<NavItem to={ROUTES.USER.PROFILE_EDIT}>
					<NavText variant="article-subtitle-sm">회원 정보 수정</NavText>
				</NavItem>
				<NavItem to={ROUTES.BOOK.LIKED_LIST}>
					<NavText variant="article-subtitle-sm">찜한 도서</NavText>
				</NavItem>
			</Navigation>
		</Container>
	);
}

export default MyPageSideNavigation;
