import React from 'react';
import styled from 'styled-components';

import { Heading3 as Title } from '@typographies';
import ReviewAddForm from './ReviewAddForm';

const Container = styled.div`
	flex: 1;
	padding: 50px 0px 50px 20px;
`;

function ReviewAddSection(): JSX.Element {
	return (
		<Container>
			<Title
				variant="section-title-lg"
				$fontWeight={700}
				$marginBottom="30px"
				$textAlign="center"
				$color="#555"
			>
				Add Review
			</Title>
			<ReviewAddForm />
		</Container>
	);
}

export default ReviewAddSection;
