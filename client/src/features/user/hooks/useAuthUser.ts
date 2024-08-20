import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { userKeys } from '@config/query/queryKeys';

import { TIME_MS } from '@constants/time';
import { IUserAuth } from '../types/userData';

import userApis from '../apis/userApis';

const TOKEN_EXPIRATION_TIME = TIME_MS.HOUR;

type UseAuthUserOptions<TData = IUserAuth> = Omit<
	UseQueryOptions<IUserAuth, Error, TData>,
	'queryKey' | 'queryFn'
>;

function useAuthUser<TData = IUserAuth>(options?: UseAuthUserOptions<TData>) {
	return useQuery({
		queryKey: userKeys.auth,
		queryFn: userApis.getAuth,
		staleTime: TOKEN_EXPIRATION_TIME,
		gcTime: TOKEN_EXPIRATION_TIME,
		...options,
	});
}

export default useAuthUser;
