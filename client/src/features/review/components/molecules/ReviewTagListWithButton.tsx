import React from 'react';
import { styled } from 'styled-components';

import ReviewTagWithDeleteButton from './ReviewTagWithDeleteButton';

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	gap: 10px 7px;
	padding: 0px 5px;
`;

interface IReviewTag {
	id: number;
	text: string;
}

interface IReviewTagListWithButtonProps {
	tags: IReviewTag[];
}

function ReviewTagListWithButton({
	tags,
}: IReviewTagListWithButtonProps): JSX.Element {
	return (
		<Container>
			{tags.map(tag => (
				<ReviewTagWithDeleteButton key={tag.id} variantSize="lg">
					{tag.text}
				</ReviewTagWithDeleteButton>
			))}
		</Container>
	);
}

export default ReviewTagListWithButton;
