import React from 'react';
import styled from 'styled-components';

import { Heading3 as Title } from '@typographies/TextElements';
import BookReviewAddForm from './BookReviewAddForm';

const Container = styled.div`
	flex: 1;
	padding: 50px 0px 50px 20px;
`;

function BookReviewAddSection(): JSX.Element {
	return (
		<Container>
			<Title
				variant="section-title-lg"
				$fontFamily="var(--main-font-eng)"
				$marginBottom="30px"
				$textAlign="center"
				$color="#555"
			>
				Add Review
			</Title>
			<BookReviewAddForm />
		</Container>
	);
}

export default BookReviewAddSection;
