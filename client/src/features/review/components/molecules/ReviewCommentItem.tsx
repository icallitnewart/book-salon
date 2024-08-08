import React, { useState } from 'react';
import { styled } from 'styled-components';

import { IUserData } from '@features/user/types/userData';
import useAuthUser from '@features/user/hooks/useAuthUser';

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
	author: IUserData;
	createdAt: string;
	content: string;
}

function ReviewCommentItem({
	author,
	createdAt,
	content,
}: IReviewCommentItemProps): JSX.Element {
	const [isEditMode, setIsEditMode] = useState(false);
	const { data: userId } = useAuthUser({
		select: data => data?.user?.id,
	});

	const handleEdit = () => {
		setIsEditMode(true);
	};

	const handleDelete = () => {};

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
				/>
			)}
		</Container>
	);
}

export default ReviewCommentItem;
