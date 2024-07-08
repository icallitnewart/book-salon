import React from 'react';
import styled, { keyframes } from 'styled-components';

import { ReactComponent as HeartSvg } from '@assets/svg/heart.svg';
import { BlackTextButton } from '@buttons/TextButtons/ColoredTextButtons';

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

const Button = styled(BlackTextButton)`
	gap: 4px;
	padding-right: 5px;

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

function LikeBookButton(): JSX.Element {
	return (
		<Button $width="120px" $hoverTextColor="#fff">
			<StyledHeartSvg />
			좋아요
		</Button>
	);
}

export default LikeBookButton;
