import React from 'react';
import styled from 'styled-components';

import ReviewTagItem from '../atoms/ReviewTagItem';
import ReviewTagDeleteButton from '../atoms/ReviewTagDeleteButton';

const Container = styled.div`
	display: flex;
`;

interface IReviewTagWithDeleteButtonProps {
	children: string;
	variantSize?: 'sm' | 'md' | 'lg';
	handleClick?: () => void;
}

function ReviewTagWithDeleteButton({
	children,
	variantSize,
	handleClick = () => {},
}: IReviewTagWithDeleteButtonProps): JSX.Element {
	return (
		<Container>
			<ReviewTagItem variantSize={variantSize}>{children}</ReviewTagItem>
			<ReviewTagDeleteButton handleClick={handleClick} />
		</Container>
	);
}

export default ReviewTagWithDeleteButton;
