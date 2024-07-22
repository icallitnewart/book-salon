import { queryClient } from '@config/query/queryClient';
import { userKeys } from '@config/query/queryKeys';
import { IAuthQueryData } from '@features/user/types/userQueryData';

function useAuthQueryData() {
	const authData = queryClient.getQueryData<IAuthQueryData>(userKeys.auth);

	return {
		user: authData?.user,
		isAuth: authData?.isAuth,
	};
}

export default useAuthQueryData;
