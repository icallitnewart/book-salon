import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ROUTES } from './constants/routes';
import { AUTH_TYPES } from './constants/auth';

import GlobalStyles from './GlobalStyles';
import Auth from './shared/components/organisms/Auth';
import AuthLoader from './shared/components/organisms/AuthLoader';
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
								<Auth type={AUTH_TYPES.PUBLIC}>
									<div>Home</div>
								</Auth>
							}
						/>
						<Route
							path={ROUTES.USER.REGISTER}
							element={
								<Auth type={AUTH_TYPES.GUEST}>
									<RegisterPage />
								</Auth>
							}
						/>
						<Route
							path={ROUTES.USER.LOGIN}
							element={
								<Auth type={AUTH_TYPES.GUEST}>
									<LoginPage />
								</Auth>
							}
						/>
						<Route
							path={ROUTES.USER.MY_PROFILE}
							element={
								<Auth type={AUTH_TYPES.PRIVATE}>
									<MyProfilePage />
								</Auth>
							}
						/>
						<Route
							path={ROUTES.USER.PROFILE_EDIT}
							element={
								<Auth type={AUTH_TYPES.PRIVATE}>
									<ProfileEditPage />
								</Auth>
							}
						/>
					</Routes>
				</AuthLoader>
			</BrowserRouter>
		</div>
	);
}

export default App;
