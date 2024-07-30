import React from 'react';
import styled from 'styled-components';

import { Span } from '@typographies';
import ReviewMetaButton from '../atoms/ReviewMetaButton';

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

interface IReviewEditDeleteButtonsProps {
	variantType: 'article' | 'card';
	variantSize: 'sm' | 'md' | 'lg';
	// TODO: 필수 값으로 변경
	handleEdit?: () => void;
	handleDelete?: () => void;
}

function ReviewEditDeleteButtons({
	variantType,
	variantSize,
	handleEdit = () => {},
	handleDelete = () => {},
}: IReviewEditDeleteButtonsProps): JSX.Element {
	return (
		<Container>
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
