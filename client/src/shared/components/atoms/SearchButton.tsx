import React from 'react';
import styled from 'styled-components';

import { ReactComponent as SearchSvg } from '../../../assets/svg/search.svg';

const Button = styled.button`
	position: absolute;
	top: 50%;
	right: 10px;
	transform: translateY(-50%);
	padding: 0;
	cursor: pointer;

	background-color: transparent;
	border: none;

	svg {
		width: 30px;
		height: 30px;
		color: var(--sub-color-green);
	}
`;

function SearchButton(): JSX.Element {
	return (
		<Button type="button">
			<SearchSvg />
		</Button>
	);
}

export default SearchButton;
