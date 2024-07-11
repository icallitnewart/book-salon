import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AUTH_TYPES } from '@constants/auth';
import { ROUTES } from '@constants/routes';

import GlobalStyles from 'GlobalStyles';
import AuthLoader from '@components/organisms/AuthLoader';
import AuthChecker from '@components/organisms/AuthChecker';

import MainPage from '@pages/MainPage';
import RegisterPage from '@pages/RegisterPage';
import LoginPage from '@pages/LoginPage';
import MyProfilePage from '@pages/MyProfilePage';
import ProfileEditPage from '@pages/ProfileEditPage';
import BookDetailPage from '@pages/BookDetailPage';
import BookReviewDetailPage from '@pages/BookReviewDetailPage';

function App(): JSX.Element {
	return (
		<div className="App">
			<BrowserRouter>
				<GlobalStyles />
				<AuthLoader>
					<Routes>
						<Route
							path={ROUTES.MAIN}
							element={
								<AuthChecker type={AUTH_TYPES.PUBLIC}>
									<MainPage />
								</AuthChecker>
							}
						/>
						<Route
							path={ROUTES.USER.REGISTER}
							element={
								<AuthChecker type={AUTH_TYPES.GUEST}>
									<RegisterPage />
								</AuthChecker>
							}
						/>
						<Route
							path={ROUTES.USER.LOGIN}
							element={
								<AuthChecker type={AUTH_TYPES.GUEST}>
									<LoginPage />
								</AuthChecker>
							}
						/>
						<Route
							path={ROUTES.USER.MY_PROFILE}
							element={
								<AuthChecker type={AUTH_TYPES.PRIVATE}>
									<MyProfilePage />
								</AuthChecker>
							}
						/>
						<Route
							path={ROUTES.USER.PROFILE_EDIT}
							element={
								<AuthChecker type={AUTH_TYPES.PRIVATE}>
									<ProfileEditPage />
								</AuthChecker>
							}
						/>
						<Route
							path={ROUTES.BOOK.DETAIL}
							element={
								<AuthChecker type={AUTH_TYPES.PUBLIC}>
									<BookDetailPage />
								</AuthChecker>
							}
						/>
						<Route
							path={ROUTES.BOOK.REVIEW.DETAIL}
							element={
								<AuthChecker type={AUTH_TYPES.PUBLIC}>
									<BookReviewDetailPage />
								</AuthChecker>
							}
						/>
					</Routes>
				</AuthLoader>
			</BrowserRouter>
		</div>
	);
}

export default App;
