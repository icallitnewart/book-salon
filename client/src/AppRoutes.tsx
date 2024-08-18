import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import { AUTH_TYPES } from '@constants/auth';

import useScrollToTop from '@hooks/useScrollToTop';
import AuthChecker from '@components/organisms/AuthChecker';

import MainPage from '@pages/MainPage';
import RegisterPage from '@pages/RegisterPage';
import LoginPage from '@pages/LoginPage';
import MyProfilePage from '@pages/MyProfilePage';
import ProfileEditPage from '@pages/ProfileEditPage';
import BookDetailPage from '@pages/BookDetailPage';
import ReviewDetailPage from '@pages/ReviewDetailPage';
import ReviewAddPage from '@pages/ReviewAddPage';
import ReviewEditPage from '@pages/ReviewEditPage';
import ReviewListPage from '@pages/ReviewListPage';
import LikedBookPage from '@pages/LikedBookPage';

const routes = [
	{
		name: '메인',
		path: ROUTES.MAIN,
		authType: AUTH_TYPES.PUBLIC,
		element: <MainPage />,
	},
	{
		name: '회원가입',
		path: ROUTES.USER.REGISTER,
		authType: AUTH_TYPES.GUEST,
		element: <RegisterPage />,
	},
	{
		name: '로그인',
		path: ROUTES.USER.LOGIN,
		authType: AUTH_TYPES.GUEST,
		element: <LoginPage />,
	},
	{
		name: '내 프로필 조회',
		path: ROUTES.USER.MY_PROFILE,
		authType: AUTH_TYPES.PRIVATE,
		element: <MyProfilePage />,
	},
	{
		name: '회원 정보 수정',
		path: ROUTES.USER.PROFILE_EDIT,
		authType: AUTH_TYPES.PRIVATE,
		element: <ProfileEditPage />,
	},
	{
		name: '도서 상세',
		path: ROUTES.BOOK.DETAIL(),
		authType: AUTH_TYPES.PUBLIC,
		element: <BookDetailPage />,
	},
	{
		name: '리뷰 상세',
		path: ROUTES.REVIEW.DETAIL(),
		authType: AUTH_TYPES.PUBLIC,
		element: <ReviewDetailPage />,
	},
	{
		name: '리뷰 작성',
		path: ROUTES.REVIEW.ADD(),
		authType: AUTH_TYPES.PRIVATE,
		element: <ReviewAddPage />,
	},
	{
		name: '리뷰 수정',
		path: ROUTES.REVIEW.EDIT(),
		authType: AUTH_TYPES.PRIVATE,
		element: <ReviewEditPage />,
	},
	{
		name: '리뷰 목록',
		path: ROUTES.REVIEW.LIST,
		authType: AUTH_TYPES.PUBLIC,
		element: <ReviewListPage />,
	},
	{
		name: '찜한 도서 목록',
		path: ROUTES.BOOK.LIKED_LIST,
		authType: AUTH_TYPES.PRIVATE,
		element: <LikedBookPage />,
	},
];

function AppRoutes() {
	useScrollToTop();

	return (
		<Routes>
			{routes.map(({ name, path, authType, element }) => (
				<Route
					key={name}
					path={path}
					element={<AuthChecker type={authType}>{element}</AuthChecker>}
				/>
			))}
		</Routes>
	);
}

export default AppRoutes;
