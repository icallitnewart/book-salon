import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import { ROUTES } from '@constants/routes';
import useEffectOnce from '@hooks/useEffectOnce';
import useAuthUser from '@features/user/hooks/useAuthUser';

import Skeleton from '@components/atoms/Skeleton';
import { Heading3 as Title, Span, SanitisedHTML } from '@typographies';
import Divider from '@components/atoms/Divider';
import ReviewTagList from '../molecules/ReviewTagList';
import ReviewPostRatingBox from '../molecules/ReviewPostRatingBox';
import ReviewEditDeleteButtons from '../molecules/ReviewEditDeleteButtons';
import ReviewAuthorWithDate from '../molecules/ReviewAuthorWithDate';

import useUpdateReviewViewCount from '../../hooks/useUpdateReviewViewCount';
import useDeleteReview from '../../hooks/useDeleteReview';
import useReviewDetail from '../../hooks/useReviewDetail';

const Container = styled.div`
	width: 100%;
	min-height: 400px;
	padding: 10px 0px;
	margin-bottom: 20px;
`;

interface IMetaInfoStyleProps {
	$marginBottom?: string;
}

const MetaInfo = styled.div<IMetaInfoStyleProps>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	${({ $marginBottom }) => $marginBottom && `margin-bottom: ${$marginBottom};`}
`;

function ReviewPostContent(): JSX.Element {
	const navigate = useNavigate();
	const { reviewId } = useParams();
	const { data: review } = useReviewDetail(reviewId);
	const { deleteReview } = useDeleteReview(reviewId);
	const { updateReviewViewCount } = useUpdateReviewViewCount(reviewId);
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

	useEffectOnce(() => {
		if (reviewId) {
			updateReviewViewCount();
		}
	}, [reviewId, updateReviewViewCount]);

	if (!review) {
		return <ReviewPostContent.Skeleton />;
	}

	return (
		<Container>
			<MetaInfo $marginBottom="7px">
				<ReviewTagList tags={review?.tags} />
			</MetaInfo>
			<Title variant="article-title-xl" $lineHeight={1.5} $textAlign="justify">
				{review?.title}
			</Title>
			<Divider $margin="13px 0px 8px" />
			<MetaInfo $marginBottom="15px">
				<ReviewAuthorWithDate
					author={review?.user?.nickname}
					date={review?.createdAt}
					variantSize="lg"
				/>
				<Span variant="article-meta-lg">조회수 {review?.viewCount}</Span>
			</MetaInfo>
			<SanitisedHTML
				html={review?.content}
				variant="article-body-lg"
				$lineHeight={1.8}
				$textAlign="justify"
				$marginBottom="50px"
			/>
			{review?.rating && <ReviewPostRatingBox rating={review.rating} />}
			{review?.user?.id === userId && (
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

const TagListSkeletonWrapper = styled.div`
	display: flex;
	gap: 10px;
	width: 100%;
	margin-bottom: 10px;
`;

ReviewPostContent.Skeleton = function (): JSX.Element {
	return (
		<Container>
			<TagListSkeletonWrapper>
				<Skeleton width="70px" height={20} />
				<Skeleton width="100px" height={20} />
				<Skeleton width="80px" height={20} />
				<Skeleton width="90px" height={20} />
			</TagListSkeletonWrapper>
			<Skeleton width="100%" height={50} />
			<Divider $margin="13px 0px 8px" />
			<MetaInfo $marginBottom="20px">
				<Skeleton width="150px" height={20} />
				<Skeleton width="100px" height={20} />
			</MetaInfo>
			<Skeleton width="100%" height={25} $marginBottom="15px" />
			<Skeleton width="100%" height={25} $marginBottom="15px" />
			<Skeleton width="100%" height={25} $marginBottom="15px" />
			<Skeleton width="100%" height={25} $marginBottom="15px" />
			<Skeleton width="100%" height={25} $marginBottom="15px" />
			<Skeleton width="60%" height={25} $marginBottom="15px" />
		</Container>
	);
};

export default ReviewPostContent;
