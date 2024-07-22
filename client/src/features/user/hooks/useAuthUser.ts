import { useQuery } from '@tanstack/react-query';

import { userKeys } from '@config/query/queryKeys';
import userApis from '../apis/userApis';

const TOKEN_EXPIRATION_TIME = 1000 * 60 * 60; // 1 hr

function useAuthUser() {
	return useQuery({
		queryKey: userKeys.auth,
		queryFn: userApis.getAuth,
		staleTime: TOKEN_EXPIRATION_TIME,
		gcTime: TOKEN_EXPIRATION_TIME,
	});
}

export default useAuthUser;
