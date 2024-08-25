import React from 'react';
import { styled } from 'styled-components';

import { Span } from '@typographies';
import ReviewRatingDisplay from './ReviewRatingDisplay';

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 30px;
`;

const Wrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	width: 180px;
	height: 150px;
	padding-top: 25px;
	background-color: var(--bg-color-grey-1);
	border: 1px solid rgba(14, 191, 124, 0.4);
	box-shadow: 0px 0px 10px rgba(14, 191, 124, 0.1);
	border-radius: 10px 10px 50px 50px;
`;

const ReviewRatingStars = styled.div`
	margin-bottom: 3px;

	svg {
		color: var(--sub-color-green);
	}

	svg:nth-child(1),
	svg:nth-child(5) {
		transform: translateY(-25px);
	}
	svg:nth-child(2),
	svg:nth-child(4) {
		transform: translateY(-10px);
	}
	svg:nth-child(3) {
		transform: translateY(0);
	}
`;

const ReviewRatingNumber = styled.div`
	display: flex;
	align-items: flex-end;
	gap: 3px;
`;

interface IReviewPostRatingBoxProps {
	rating: number;
}

function ReviewPostRatingBox({
	rating,
}: IReviewPostRatingBoxProps): JSX.Element {
	return (
		<Container>
			<Wrapper>
				<ReviewRatingStars>
					<ReviewRatingDisplay rating={rating} size="lg" />
				</ReviewRatingStars>
				<ReviewRatingNumber>
					<Span
						$fontFamily="var(--main-font-eng)"
						$fontWeight={500}
						$fontSize={2.4}
						$color="#666"
					>
						{rating}
					</Span>
					<Span $fontFamily="var(--main-font-eng)" $fontSize={2}>
						/
					</Span>
					<Span $fontFamily="var(--main-font-eng)" $fontSize={2}>
						5
					</Span>
				</ReviewRatingNumber>
				<Span
					variant="article-meta-sm"
					$fontWeight={500}
					$fontFamily="var(--main-font-eng)"
				>
					SCORE
				</Span>
			</Wrapper>
		</Container>
	);
}

export default ReviewPostRatingBox;
