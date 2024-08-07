import React from 'react';
import styled from 'styled-components';

import ReviewCommentTextAreaWithButton from '../molecules/ReviewCommentTextAreaWithButton';
import ReviewTotalComment from '../molecules/ReviewTotalComment';
import ReviewCommentList from './ReviewCommentList';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 20px;
`;

function ReviewCommentBox(): JSX.Element {
	return (
		<Container>
			<ReviewTotalComment />
			<ReviewCommentList />
			<ReviewCommentTextAreaWithButton />
		</Container>
	);
}

export default ReviewCommentBox;
