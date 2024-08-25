import React from 'react';
import { Navigate } from 'react-router-dom';

import PageTemplate from '@components/templates/PageTemplate';
import ReviewDetailTemplate from '@features/review/components/templates/ReviewDetailTemplate';
import withAsyncBoundary from '@components/organisms/withAsyncBoundary';

function ReviewDetailPage(): JSX.Element {
	return (
		<PageTemplate>
			<ReviewDetailTemplate />
		</PageTemplate>
	);
}

export default withAsyncBoundary(ReviewDetailPage, {
	SuspenseFallback: null,
	// TODO: Error 페이지로 리다이렉트
	ErrorFallback: () => <Navigate to=".." replace />,
});
