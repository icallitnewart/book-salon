import React from 'react';
import { useParams } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';

import useAuthUser from '@features/user/hooks/useAuthUser';
import useCheckBookLike from '@features/book/hooks/useCheckBookLike';

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

interface IHeartIconStyleProps {
	$isLiked: boolean;
}

const StyledButton = styled(SecondaryButtonWithStyles)<IHeartIconStyleProps>`
	gap: 4px;

	${({ $isLiked }) =>
		!$isLiked &&
		css`
			&:hover svg {
				animation: ${moveUpAndDown} 0.5s infinite;
			}
		`}
`;

const HeartIcon = styled(HeartSvg)<IHeartIconStyleProps>`
	color: ${({ $isLiked }) => ($isLiked ? '#ed1480' : 'var(--sub-color-green)')};
	width: 22px;
	height: 22px;
	margin-bottom: -2.5px;
`;

function BookLikeButton(): JSX.Element {
	const { isbn } = useParams();
	const { data: isAuth } = useAuthUser({
		select: data => data.isAuth,
	});
	const { data: isLiked } = useCheckBookLike(isbn, isAuth);

	return (
		<StyledButton
			type="button"
			$width="120px"
			$hoverTextColor="#fff"
			$isLiked={!!isLiked}
		>
			<HeartIcon $isLiked={!!isLiked} />
			좋아요
		</StyledButton>
	);
}

export default BookLikeButton;
