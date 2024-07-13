import React from 'react';
import styled from 'styled-components';

import ReviewBookProfileSideSection from '../organisms/ReviewBookProfileSideSection';

const Container = styled.div`
	display: flex;
	width: 100%;
`;

interface IBookProfileTemplateProps {
	children: React.ReactNode;
}

function ReviewBookProfileLayoutTemplate({
	children,
}: IBookProfileTemplateProps): JSX.Element {
	return (
		<Container>
			<ReviewBookProfileSideSection />
			{children}
		</Container>
	);
}

export default ReviewBookProfileLayoutTemplate;
