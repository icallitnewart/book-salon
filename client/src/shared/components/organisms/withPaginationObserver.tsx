/* eslint-disable react/jsx-props-no-spreading */
import React, { ComponentType } from 'react';
import Loader from '@components/molecules/Loader';

interface IWithPaginationObserverProps<P> {
	Component: ComponentType<P>;
	observerRef: React.RefObject<HTMLElement>;
	isFetchingNextPage: boolean;
	loader?: React.ReactNode;
}

function withPaginationObserver<P extends object>({
	Component,
	observerRef,
	isFetchingNextPage,
	loader = <Loader />,
}: IWithPaginationObserverProps<P>) {
	return function PaginationObserver(props: P) {
		return (
			<Component {...props} ref={observerRef}>
				{isFetchingNextPage && loader}
			</Component>
		);
	};
}

export default withPaginationObserver;
