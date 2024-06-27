import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ROUTES } from './constants/routes';

import GlobalStyles from './GlobalStyles';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MyProfilePage from './pages/MyProfilePage';
import ProfileEditPage from './pages/ProfileEditPage';

function App(): JSX.Element {
	return (
		<div className="App">
			<BrowserRouter>
				<GlobalStyles />
				<Routes>
					<Route path={ROUTES.MAIN} element={<div>Home</div>} />
					<Route path={ROUTES.USER.REGISTER} element={<RegisterPage />} />
					<Route path={ROUTES.USER.LOGIN} element={<LoginPage />} />
					<Route path={ROUTES.USER.MY_PROFILE} element={<MyProfilePage />} />
					<Route
						path={ROUTES.USER.PROFILE_EDIT}
						element={<ProfileEditPage />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
