import React, { Suspense } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from '../molecules/ErrorFallback';
import Loader from '../molecules/Loader';

interface IAsyncBoundaryProps {
	children: JSX.Element;
}

function AsyncBoundary({ children }: IAsyncBoundaryProps): JSX.Element {
	return (
		<QueryErrorResetBoundary>
			{({ reset }) => (
				<ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
					<Suspense fallback={<Loader />}>{children}</Suspense>
				</ErrorBoundary>
			)}
		</QueryErrorResetBoundary>
	);
}

export default AsyncBoundary;
