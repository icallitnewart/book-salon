import React from 'react';
import { styled } from 'styled-components';

import SearchInput from '../atoms/SearchInput';
import SearchButton from '../atoms/SearchButton';

const Container = styled.div`
	position: relative;
	width: 400px;
	height: 40px;
`;

function SearchBar(): JSX.Element {
	return (
		<Container>
			<SearchInput />
			<SearchButton />
		</Container>
	);
}

export default SearchBar;
