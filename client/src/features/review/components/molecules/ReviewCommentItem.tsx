import React from 'react';
import { styled } from 'styled-components';

import { IUserData } from '@features/user/types/userData';
import useAuthUser from '@features/user/hooks/useAuthUser';

import { ParagraphWithStyles } from '@typographies';
import ReviewEditDeleteButtons from './ReviewEditDeleteButtons';
import ReviewAuthorWithDate from './ReviewAuthorWithDate';

const Container = styled.div`
	padding: 3px 10px;
`;

const Content = styled(ParagraphWithStyles)`
	width: 100%;
	padding: 15px 18px;

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
	const { data: userId } = useAuthUser({
		select: data => data?.user?.id,
	});

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
					/>
				)}
			</MetaInfo>
			<Content
				variant="article-body-md"
				$lineHeight={1.6}
				$textAlign="justify"
				$marginBottom="10px"
				$color="#555"
				$fontWeight={400}
			>
				{content}
			</Content>
		</Container>
	);
}

export default ReviewCommentItem;
