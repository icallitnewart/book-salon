import React from 'react';
import styled from 'styled-components';

import ReviewListSection from '../organisms/ReviewListSection';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

function ReviewListTemplate(): JSX.Element {
	return (
		<Container>
			<ReviewListSection />
		</Container>
	);
}

export default ReviewListTemplate;
