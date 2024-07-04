import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ROUTES } from './constants/routes';
import { AUTH_TYPES } from './constants/auth';

import GlobalStyles from './GlobalStyles';
import AuthChecker from './shared/components/organisms/AuthChecker';
import AuthLoader from './shared/components/organisms/AuthLoader';

import MainPage from './pages/MainPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MyProfilePage from './pages/MyProfilePage';
import ProfileEditPage from './pages/ProfileEditPage';

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
					</Routes>
				</AuthLoader>
			</BrowserRouter>
		</div>
	);
}

export default App;
