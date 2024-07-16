import React from 'react';
import styled, { keyframes } from 'styled-components';

import { ReactComponent as HeartSvg } from '@assets/svg/heart.svg';
import { SecondaryButtonWithStyles } from '@buttons';

const moveUpAndDown = keyframes`
	0% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-2px);
	}
	100% {
		transform: translateY(0);
	}
`;

const StyledButton = styled(SecondaryButtonWithStyles)`
	gap: 4px;

	&:hover svg {
		animation: ${moveUpAndDown} 0.5s infinite;
	}
`;

const StyledHeartSvg = styled(HeartSvg)`
	color: var(--sub-color-green);
	width: 20px;
	height: 20px;
	margin-bottom: -2.5px;
`;

function BookLikeButton(): JSX.Element {
	return (
		<StyledButton $width="120px" $hoverTextColor="#fff">
			<StyledHeartSvg />
			좋아요
		</StyledButton>
	);
}

export default BookLikeButton;
