import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { nanoid } from 'nanoid';

import { ROUTES } from '@constants/routes';
import { IReviewDetail } from '@features/review/types/reviewData';

import { ReactComponent as NoteSvg } from '@assets/svg/note.svg';
import { Paragraph } from '@typographies';
import { PrimaryButton } from '@buttons';
import ReviewCompactCardItem from '../molecules/ReviewCompactCardItem';

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: 20px;
	width: 100%;
`;

interface IReviewCompactCardListProps {
	reviews?: IReviewDetail[];
	isPending: boolean;
}

function ReviewCompactCardList({
	reviews,
	isPending,
}: IReviewCompactCardListProps): JSX.Element {
	const navigate = useNavigate();
	const { isbn } = useParams();
	const redirectToAddReviewPage = () => {
		navigate(ROUTES.REVIEW.ADD(isbn));
	};

	if (isPending || !reviews) {
		return <ReviewCompactCardList.Skeleton />;
	}

	if (reviews.length === 0) {
		return (
			<ReviewCompactCardList.EmptyAlert redirect={redirectToAddReviewPage} />
		);
	}

	return (
		<Container>
			{reviews.map(review => (
				<ReviewCompactCardItem
					key={review.id}
					id={review.id}
					user={review.user}
					title={review.title}
					content={review.content}
					createdAt={review.createdAt}
					viewCount={review.viewCount}
					commentCount={review.commentCount}
					rating={review.rating}
				/>
			))}
		</Container>
	);
}

const SkeletonContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	min-height: 300px;
	flex: 1;
`;

const NoteIcon = styled(NoteSvg)`
	width: 50px;
	height: 50px;
	color: #999;
	margin-bottom: 30px;
`;

ReviewCompactCardList.EmptyAlert = function ({
	redirect,
}: {
	redirect: () => void;
}): JSX.Element {
	return (
		<SkeletonContainer>
			<NoteIcon />
			<Paragraph
				variant="article-subtitle-md"
				$color="#888"
				$marginBottom="30px"
			>
				해당 도서에 대해 작성된 리뷰가 없습니다
			</Paragraph>
			<PrimaryButton $width="150px" $margin="0px 0px 30px" onClick={redirect}>
				작성하러 가기
			</PrimaryButton>
		</SkeletonContainer>
	);
};

ReviewCompactCardList.Skeleton = function (): JSX.Element {
	return (
		<Container>
			{Array.from({ length: 6 }).map(_ => (
				<ReviewCompactCardItem.Skeleton key={nanoid()} />
			))}
		</Container>
	);
};

export default ReviewCompactCardList;
