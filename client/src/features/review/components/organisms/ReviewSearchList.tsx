import React from 'react';
import { styled } from 'styled-components';

import { IReviewDetail } from '@features/review/types/reviewData';

import useReviewList from '@features/review/hooks/useReviewList';

import ReviewSearchItem from '../molecules/ReviewSearchItem';

const Container = styled.ul`
	width: 100%;
	height: calc(100% - 30px);
	overflow-y: auto;

	&::-webkit-scrollbar {
		width: 9px;
	}

	&::-webkit-scrollbar-track {
		background: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background-color: #ddd;
		border-radius: 20px;
		border: 4px solid transparent;
		border-left: 2px;
		background-clip: content-box;
	}
`;

interface IReviewSearchListProps {
	closeModal: () => void;
}

function ReviewSearchList({ closeModal }: IReviewSearchListProps): JSX.Element {
	// TODO: 제거 예정 (테스트용)
	const { data: reviews } = useReviewList(
		{
			filters: {
				isbn: '9791170611561',
			},
		},
		{
			select: data => data.reviews,
		},
	);

	return (
		<Container>
			{reviews &&
				reviews.map((review: IReviewDetail) => (
					<ReviewSearchItem
						key={review.id}
						id={review.id}
						title={review.title}
						content={review.content}
						user={review.user}
						createdAt={review.createdAt}
						viewCount={review.viewCount}
						book={review.book}
						closeModal={closeModal}
					/>
				))}
		</Container>
	);
}

export default ReviewSearchList;
