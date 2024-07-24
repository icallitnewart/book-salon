import { useSuspenseQuery } from '@tanstack/react-query';

import { bookKeys } from '@config/query/queryKeys';
import bookApis from '../apis/bookApis';

function useBestsellerList() {
	const getNextUpdateTime = () => {
		const now = new Date();
		const nextMonday = new Date(now);
		nextMonday.setDate(now.getDate() + ((1 + 7 - now.getDay()) % 7));
		nextMonday.setHours(0, 0, 0, 0);
		const nextUpdateTime = nextMonday.getTime() - now.getTime();

		return nextUpdateTime;
	};

	return useSuspenseQuery({
		queryKey: bookKeys.bestseller,
		queryFn: bookApis.getBestsellerList,
		staleTime: getNextUpdateTime(),
		gcTime: getNextUpdateTime(),
	});
}

export default useBestsellerList;
