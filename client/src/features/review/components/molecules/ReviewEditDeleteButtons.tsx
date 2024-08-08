import React from 'react';
import styled from 'styled-components';

import { Span } from '@typographies';
import ReviewMetaButton from '../atoms/ReviewMetaButton';

interface IContainerStyleProps {
	$width?: string;
}

const Container = styled.div<IContainerStyleProps>`
	width: ${({ $width }: IContainerStyleProps) => $width || '100%'};
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

interface IReviewEditDeleteButtonsProps extends IContainerStyleProps {
	variantType: 'article' | 'card';
	variantSize: 'sm' | 'md' | 'lg';
	handleEdit: () => void;
	handleDelete: () => void;
}

function ReviewEditDeleteButtons({
	variantType,
	variantSize,
	handleEdit = () => {},
	handleDelete = () => {},
	$width,
}: IReviewEditDeleteButtonsProps): JSX.Element {
	return (
		<Container $width={$width}>
			<ReviewMetaButton
				variantType={variantType}
				variantSize={variantSize}
				onClick={handleEdit}
			>
				수정
			</ReviewMetaButton>
			<Span variant={`${variantType}-meta-sm`} $margin="0px 7px" $color="#bbb">
				|
			</Span>
			<ReviewMetaButton
				variantType={variantType}
				variantSize={variantSize}
				onClick={handleDelete}
			>
				삭제
			</ReviewMetaButton>
		</Container>
	);
}

export default ReviewEditDeleteButtons;
