import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import { IUserData } from '@features/user/types/userData';
import { IReviewCommentCount } from '@features/review/types/reviewCommentData';

import useAuthUser from '@features/user/hooks/useAuthUser';
import useDeleteReviewComment from '@features/review/hooks/useDeleteReviewComment';

import { ParagraphWithStyles } from '@typographies';
import ReviewEditDeleteButtons from './ReviewEditDeleteButtons';
import ReviewAuthorWithDate from './ReviewAuthorWithDate';
import ReviewCommentEditModalTemplate from '../templates/ReviewCommentEditModalTemplate';

const Container = styled.div`
	padding: 3px 10px;
`;

const Content = styled(ParagraphWithStyles)`
	width: 100%;
	padding: 15px 18px;
	margin-bottom: 10px;

	border-radius: 7px;
	background-color: #fbfbfb;
	border: 1px solid #eee;
	box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.05);
	white-space: pre-wrap;
`;

const MetaInfo = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0px 5px;
	margin-bottom: 10px;
`;

interface IReviewCommentItemProps {
	id: string;
	author: IUserData;
	createdAt: string;
	content: string;
}

function ReviewCommentItem({
	id,
	author,
	createdAt,
	content,
}: IReviewCommentItemProps): JSX.Element {
	const { reviewId } = useParams();
	const [isEditMode, setIsEditMode] = useState(false);
	const { deleteReviewComment, initaliseQueryAfterMutation } =
		useDeleteReviewComment(id, reviewId);
	const { data: userId } = useAuthUser({
		select: data => data?.user?.id,
	});

	const handleEdit = () => {
		setIsEditMode(true);
	};

	const handleDelete = () => {
		if (window.confirm('정말 삭제하시겠습니까?')) {
			deleteReviewComment(undefined, {
				onSuccess: ({ commentCount }: IReviewCommentCount) => {
					alert('댓글이 삭제되었습니다.');
					initaliseQueryAfterMutation(commentCount);
				},
				onError: () => {
					alert('댓글 삭제에 실패했습니다. 다시 시도해주세요.');
				},
			});
		}
	};

	return (
		<Container>
			<MetaInfo>
				<ReviewAuthorWithDate
					author={author.nickname}
					date={createdAt}
					$flex={1}
				/>
				{userId === author.id && (
					<ReviewEditDeleteButtons
						variantType="card"
						variantSize="md"
						$width="auto"
						handleEdit={handleEdit}
						handleDelete={handleDelete}
					/>
				)}
			</MetaInfo>
			<Content>{content}</Content>
			{isEditMode && (
				<ReviewCommentEditModalTemplate
					content={content}
					isOpen={isEditMode}
					closeModal={() => setIsEditMode(false)}
					commentId={id}
				/>
			)}
		</Container>
	);
}

export default ReviewCommentItem;
