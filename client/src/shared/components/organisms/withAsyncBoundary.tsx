/* eslint-disable react/jsx-props-no-spreading */
import React, { ComponentType, ReactNode, Suspense } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

import ErrorFallbackComponent from '../molecules/ErrorFallback';
import Loader from '../molecules/Loader';

interface IAsyncBoundaryOptions {
	ErrorFallback?: ComponentType<FallbackProps>;
	SuspenseFallback?: ReactNode | null;
}

function withAsyncBoundary<P extends object>(
	WrappedComponent: ComponentType<P>,
	{
		ErrorFallback = ErrorFallbackComponent,
		SuspenseFallback = <Loader />,
	}: IAsyncBoundaryOptions = {},
) {
	return function AsyncBoundary(props: P): JSX.Element {
		return (
			<QueryErrorResetBoundary>
				{({ reset }) => (
					<ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
						{SuspenseFallback === null ? (
							<WrappedComponent {...props} />
						) : (
							<Suspense fallback={SuspenseFallback}>
								<WrappedComponent {...props} />
							</Suspense>
						)}
					</ErrorBoundary>
				)}
			</QueryErrorResetBoundary>
		);
	};
}

export default withAsyncBoundary;
