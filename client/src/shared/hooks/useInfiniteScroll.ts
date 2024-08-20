import { useEffect, useRef } from 'react';

interface IIntersectionObserverProps {
	hasNextPage: boolean;
	isFetchingNextPage: boolean;
	fetchNextPage: () => void;
	threshold?: number;
	isEnabled?: boolean;
}

function useInfiniteScroll({
	hasNextPage,
	isFetchingNextPage,
	fetchNextPage,
	threshold = 0.5,
	isEnabled = true,
}: IIntersectionObserverProps) {
	const observerRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (!isEnabled) return;

		const observer = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
					fetchNextPage();
				}
			},
			{ threshold },
		);

		if (observerRef.current) {
			observer.observe(observerRef.current);
		}

		// eslint-disable-next-line consistent-return
		return () => observer.disconnect();
	}, [fetchNextPage, hasNextPage, isFetchingNextPage, threshold, isEnabled]);

	return observerRef;
}

export default useInfiniteScroll;
