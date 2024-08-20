import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from 'GlobalStyles';
import AppRoutes from 'AppRoutes';

function App(): JSX.Element {
	return (
		<div className="App">
			<BrowserRouter>
				<GlobalStyles />
				<AppRoutes />
			</BrowserRouter>
		</div>
	);
}

export default App;
