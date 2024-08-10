import React from 'react';
import { styled } from 'styled-components';

import ModalSearchBar from './ModalSearchBar';

const Container = styled.div`
	width: 600px;
	height: 550px;

	background-color: #fff;
`;

function SearchModal(): JSX.Element {
	return (
		<Container>
			<ModalSearchBar />
		</Container>
	);
}

export default SearchModal;
