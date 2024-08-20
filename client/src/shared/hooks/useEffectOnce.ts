/* eslint-disable react-hooks/exhaustive-deps */
import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

function useEffectOnce(effect: EffectCallback, deps: DependencyList = []) {
	const isFirstRender = useRef(true);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			effect();
		}
	}, deps);
}

export default useEffectOnce;
