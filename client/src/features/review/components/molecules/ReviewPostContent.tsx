import React from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import { formatISODate } from '@utils/dateFormatter';

import { Heading3 as Title, Span, SanitisedHTML } from '@typographies';
import Divider from '@components/atoms/Divider';
import ReviewTagList from './ReviewTagList';
import ReviewControlButtons from './ReviewControlButtons';

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
	const { reviewId } = useParams();
	const { data: review } = useReviewDetail(reviewId);

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
			<ReviewControlButtons variantType="article" variantSize="lg" />
		</Container>
	);
}

export default ReviewPostContent;
