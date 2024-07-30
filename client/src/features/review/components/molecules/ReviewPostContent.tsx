import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import { formatISODate } from '@utils/dateFormatter';
import { ROUTES } from '@constants/routes';
import useAuthUser from '@features/user/hooks/useAuthUser';

import { Heading3 as Title, Span, SanitisedHTML } from '@typographies';
import Divider from '@components/atoms/Divider';
import ReviewTagList from './ReviewTagList';
import ReviewEditDeleteButtons from './ReviewEditDeleteButtons';

import useDeleteReview from '../../hooks/useDeleteReview';
import useReviewDetail from '../../hooks/useReviewDetail';

const Container = styled.div`
	width: 100%;
	min-height: 400px;
	padding: 10px 0px;
	margin-bottom: 20px;
`;

const MetaInfo = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin-bottom: 20px;
`;

function ReviewPostContent(): JSX.Element {
	const navigate = useNavigate();
	const { reviewId } = useParams();
	const { data: review } = useReviewDetail(reviewId);
	const { deleteReview } = useDeleteReview(reviewId);
	const { data: userId } = useAuthUser({
		select: data => data.user?.id,
	});

	const handleEdit = () => {
		navigate(ROUTES.REVIEW.EDIT(reviewId));
	};

	const handleDelete = () => {
		if (window.confirm('정말 삭제하시겠습니까?')) {
			deleteReview(undefined, {
				onSuccess: () => {
					alert('리뷰가 성공적으로 삭제되었습니다.');
					navigate(ROUTES.REVIEW.LIST);
				},
				onError: () => {
					alert('리뷰 삭제에 실패했습니다. 다시 시도해주세요.');
				},
			});
		}
	};

	return (
		<Container>
			<Title variant="article-title-lg" $lineHeight={1.8} $textAlign="justify">
				{review?.title}
			</Title>
			<Divider $margin="13px 0px" />
			<MetaInfo>
				<ReviewTagList tags={review?.tags} />
				<Span variant="article-meta-lg" $lineHeight={1.8} $color="#888">
					{review && formatISODate(review.createdAt)}
				</Span>
			</MetaInfo>
			<SanitisedHTML
				html={review?.content}
				variant="article-body-lg"
				$lineHeight={1.8}
				$minHeight="200px"
				$textAlign="justify"
			/>
			{review?.user.id === userId && (
				<ReviewEditDeleteButtons
					variantType="article"
					variantSize="lg"
					handleEdit={handleEdit}
					handleDelete={handleDelete}
				/>
			)}
		</Container>
	);
}

export default ReviewPostContent;
