import React from 'react';
import { styled } from 'styled-components';

import ReviewBookProfilePanel from '../molecules/ReviewBookProfilePanel';

const Container = styled.aside`
	position: relative;
	width: 300px;
	margin-right: 60px;
`;

function ReviewBookProfileSideSection(): JSX.Element {
	return (
		<Container>
			<ReviewBookProfilePanel />
		</Container>
	);
}

export default ReviewBookProfileSideSection;
