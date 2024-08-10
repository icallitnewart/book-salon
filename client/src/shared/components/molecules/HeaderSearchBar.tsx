import React, { useState } from 'react';
import { styled } from 'styled-components';

import { ReactComponent as SearchSvg } from '@assets/svg/search_sm.svg';
import { Paragraph } from '@typographies';

const Container = styled.div`
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 350px;
	height: 40px;
	padding: 0px 7px 0px 20px;

	border: 1.9px solid var(--sub-color-green);
	border-radius: 30px;

	cursor: pointer;
`;

const SearchIcon = styled(SearchSvg)`
	width: 28px;
	height: 28px;
	color: var(--sub-color-green);
	margin-bottom: 1px;
`;

function HeaderSearchBar(): JSX.Element {
	return (
		<Container>
			<Paragraph variant="article-body-md" $color="#999">
				도서나 리뷰를 검색하실 수 있어요!
			</Paragraph>
			<SearchIcon />
		</Container>
	);
}

export default HeaderSearchBar;
