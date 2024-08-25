import React from 'react';
import styled from 'styled-components';

import ReviewPostContent from './ReviewPostContent';
import ReviewCommentSection from './ReviewCommentSection';

const Container = styled.section`
	display: flex;
	flex-direction: column;
	flex: 1;
	padding: 30px 0px;
`;

function ReviewPostSection(): JSX.Element {
	return (
		<Container>
			<ReviewPostContent />
			<ReviewCommentSection />
		</Container>
	);
}

export default ReviewPostSection;
