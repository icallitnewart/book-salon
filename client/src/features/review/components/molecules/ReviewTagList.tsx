import React from 'react';
import { nanoid } from 'nanoid';
import { styled } from 'styled-components';

import ReviewTagItem from '../atoms/ReviewTagItem';

const Container = styled.div`
	display: inline-flex;
	gap: 0px 7px;
`;

interface IReviewTagListProps {
	tags?: string[];
	variantSize?: 'sm' | 'md' | 'lg';
}

function ReviewTagList({
	tags,
	variantSize = 'lg',
}: IReviewTagListProps): JSX.Element {
	return (
		<Container>
			{tags &&
				tags.map(tag => (
					<ReviewTagItem key={nanoid()} variantSize={variantSize}>
						{tag}
					</ReviewTagItem>
				))}
		</Container>
	);
}

export default ReviewTagList;
