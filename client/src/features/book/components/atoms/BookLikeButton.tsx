import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';

import useAuthUser from '@features/user/hooks/useAuthUser';
import useLikeBook from '@features/book/hooks/useLikeBook';
import useUnlikeBook from '@features/book/hooks/useUnlikeBook';
import useBookDetail from '@features/book/hooks/useBookDetail';
import useCheckBookLike from '@features/book/hooks/useCheckBookLike';

import { ROUTES } from '@constants/routes';
import { isValidBookDetail } from '@features/book/types/bookTypeGuards';
import { IBookDetail } from '@features/book/types/bookData';

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
	const navigate = useNavigate();
	const location = useLocation();
	const { isbn } = useParams();
	const { data: isAuth } = useAuthUser({
		select: data => data.isAuth,
	});
	const { data: isLiked } = useCheckBookLike(isbn, isAuth);
	const { data: book } = useBookDetail(isbn);
	const { likeBook } = useLikeBook(isbn);
	const { unlikeBook } = useUnlikeBook(isbn);

	const checkValidation = (bookData?: unknown): bookData is IBookDetail => {
		if (!isValidBookDetail(bookData)) {
			alert('오류가 발생하였습니다.');
			return false;
		}

		return true;
	};

	const redirectToLogin = () => {
		if (
			window.confirm(
				'로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?',
			)
		) {
			navigate(ROUTES.USER.LOGIN, {
				state: { from: { pathname: location.pathname } },
			});
		}
	};

	const handleClick = () => {
		if (!isAuth) {
			redirectToLogin();
			return;
		}

		const isSubmit = checkValidation(book);
		if (!isSubmit) return;

		if (isLiked) {
			unlikeBook(undefined, {
				onError: () => {
					alert('좋아요 취소에 실패했습니다. 다시 시도해주세요.');
				},
			});
		} else {
			likeBook(book, {
				onError: () => {
					alert('좋아요 등록에 실패했습니다. 다시 시도해주세요.');
				},
			});
		}
	};

	return (
		<StyledButton
			type="button"
			onClick={handleClick}
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
