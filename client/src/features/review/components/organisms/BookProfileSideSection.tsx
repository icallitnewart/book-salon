import React from 'react';
import { styled } from 'styled-components';

import BookProfilePanel from '../molecules/BookProfilePanel';

const Container = styled.aside`
	position: relative;
	width: 280px;
`;

function BookProfileSideSection(): JSX.Element {
	return (
		<Container>
			<BookProfilePanel />
		</Container>
	);
}

export default BookProfileSideSection;
