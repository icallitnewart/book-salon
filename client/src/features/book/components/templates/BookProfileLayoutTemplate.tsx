import React from 'react';
import styled from 'styled-components';

import BookProfileSideSection from '../organisms/BookProfileSideSection';

const Container = styled.div`
	display: flex;
	width: 100%;
`;

interface IBookProfileTemplateProps {
	children: React.ReactNode;
}

function BookProfileLayoutTemplate({
	children,
}: IBookProfileTemplateProps): JSX.Element {
	return (
		<Container>
			<BookProfileSideSection />
			{children}
		</Container>
	);
}

export default BookProfileLayoutTemplate;
