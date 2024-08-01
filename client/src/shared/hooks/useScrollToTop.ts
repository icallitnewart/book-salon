import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

function useScrollToTop() {
	const { pathname } = useLocation();
	const navType = useNavigationType();

	useEffect(() => {
		if (navType !== 'POP') {
			window.scrollTo(0, 0);
		}
	}, [pathname, navType]);
}

export default useScrollToTop;
