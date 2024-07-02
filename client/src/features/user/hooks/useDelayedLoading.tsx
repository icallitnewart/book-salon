import { useEffect, useState } from 'react';

function useDelayedLoading(isLoading: boolean, delay = 1000) {
	const [showLoader, setShowLoader] = useState(false);

	useEffect(() => {
		let timer: NodeJS.Timeout;

		if (isLoading) {
			timer = setTimeout(() => {
				setShowLoader(true);
			}, delay);
		} else {
			setShowLoader(false);
		}

		return () => {
			clearTimeout(timer);
		};
	}, [isLoading, delay]);

	return showLoader;
}

export default useDelayedLoading;
