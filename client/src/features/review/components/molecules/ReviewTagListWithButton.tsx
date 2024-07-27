import React from 'react';
import { styled } from 'styled-components';

import { IReviewTags } from '../../types/bookReview';

import ReviewTagWithDeleteButton from './ReviewTagWithDeleteButton';

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	gap: 10px 7px;
	padding: 0px 5px;
`;

interface IReviewTagListWithButtonProps {
	tags: IReviewTags;
	removeTag: (id: string) => void;
}

function ReviewTagListWithButton({
	tags,
	removeTag,
}: IReviewTagListWithButtonProps): JSX.Element {
	return (
		<Container>
			{tags.map(tag => (
				<ReviewTagWithDeleteButton
					key={tag.id}
					variantSize="lg"
					handleClick={() => removeTag(tag.id)}
				>
					{tag.text}
				</ReviewTagWithDeleteButton>
			))}
		</Container>
	);
}

export default ReviewTagListWithButton;
