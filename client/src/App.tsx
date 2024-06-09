import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import GlobalStyles from './GlobalStyles';
import RegisterPage from './pages/RegisterPage';

function App(): JSX.Element {
	return (
		<div className="App">
			<BrowserRouter>
				<GlobalStyles />
				<Routes>
					<Route path="/" element={<div>Home</div>} />
					<Route path="/user/register" element={<RegisterPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
