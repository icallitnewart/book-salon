import React from 'react';
import { styled } from 'styled-components';

import BookProfilePanel from './BookProfilePanel';

const Container = styled.aside`
	position: relative;
	width: 300px;
	margin-right: 60px;
`;

function BookProfileSideSection(): JSX.Element {
	return (
		<Container>
			<BookProfilePanel />
		</Container>
	);
}

export default BookProfileSideSection;
