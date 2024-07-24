import React from 'react';

interface IErrorFallbackProps {
	error: Error | null;
	resetErrorBoundary: () => void;
}

function ErrorFallback({
	error,
	resetErrorBoundary,
}: IErrorFallbackProps): JSX.Element {
	return (
		<div>
			에러가 발생했습니다. 다시 시도하겠습니까?
			<button type="button" onClick={resetErrorBoundary}>
				재시도
			</button>
		</div>
	);
}

export default React.memo(ErrorFallback);
