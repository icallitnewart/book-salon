import React from 'react';
import styled from 'styled-components';

import ReviewCommentForm from '../molecules/ReviewCommentForm';
import ReviewTotalComment from '../molecules/ReviewTotalComment';
import ReviewCommentList from './ReviewCommentList';

const Container = styled.section`
	display: flex;
	flex-direction: column;
	margin-bottom: 20px;
`;

const ReviewCommentBox = styled.div`
	width: 100%;
	min-height: 84px;
	padding: 20px;
	margin-bottom: 30px;

	background-color: #f9f8f7;
	border: 1px solid #f5f4f3;
	border-radius: 7px;
`;

function ReviewCommentSection(): JSX.Element {
	return (
		<Container>
			<ReviewTotalComment />
			<ReviewCommentBox>
				<ReviewCommentList />
			</ReviewCommentBox>
			<ReviewCommentForm />
		</Container>
	);
}

export default ReviewCommentSection;
