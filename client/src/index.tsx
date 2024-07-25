import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@config/query/queryClient';
import App from './App';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);
root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
			<div style={{ fontSize: '16px' }}>
				<ReactQueryDevtools />
			</div>
		</QueryClientProvider>
	</React.StrictMode>,
);
