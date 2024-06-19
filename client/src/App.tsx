import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import GlobalStyles from './GlobalStyles';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import UserEditPage from './pages/UserEditPage';
import MyProfilePage from './pages/MyProfilePage';

function App(): JSX.Element {
	return (
		<div className="App">
			<BrowserRouter>
				<GlobalStyles />
				<Routes>
					<Route path="/" element={<div>Home</div>} />
					<Route path="/user/register" element={<RegisterPage />} />
					<Route path="/user/login" element={<LoginPage />} />
					<Route path="/user/profile" element={<MyProfilePage />} />
					<Route path="/user/edit" element={<UserEditPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
