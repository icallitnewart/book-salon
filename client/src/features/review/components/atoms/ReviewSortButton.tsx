import React from 'react';
import { css, styled } from 'styled-components';

import { SortTypes } from '@config/query/queryKeys';

interface ISortButtonStyleProps {
	$isActive: boolean;
}

const SortButton = styled.button<ISortButtonStyleProps>`
	width: 70px;
	height: 40px;

	letter-spacing: -0.5px;
	font-size: 1.6rem;
	font-family: var(--main-font-kor);
	font-weight: 500;

	color: ${({ $isActive }) => ($isActive ? '#fff' : '#666')};
	background-color: ${({ $isActive }) =>
		$isActive ? 'var(--sub-color-darkgreen)' : 'transparent'};
	border-radius: 5px;
	border: none;
	${({ $isActive }) =>
		$isActive && 'box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15)'};
	cursor: pointer;

	${({ $isActive }) =>
		!$isActive &&
		css`
			&:hover {
				color: var(--sub-color-darkgreen);
			}
		`}
`;

const sortText = {
	[SortTypes.LATEST]: '최신순',
	[SortTypes.MOST_VIEWED]: '조회순',
};

interface IReviewSortButtonProps {
	type: SortTypes;
	sortOption: SortTypes;
	switchSortOption: (sortOption: SortTypes) => void;
}

function ReviewSortButton({
	type,
	sortOption,
	switchSortOption,
}: IReviewSortButtonProps): JSX.Element {
	return (
		<SortButton
			key={type}
			type="button"
			$isActive={sortOption === type}
			onClick={() => switchSortOption(type)}
		>
			{sortText[type]}
		</SortButton>
	);
}

export default ReviewSortButton;
