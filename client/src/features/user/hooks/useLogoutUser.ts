import { useMutation } from '@tanstack/react-query';

import { userKeys } from '@config/query/queryKeys';
import { queryClient } from '@config/query/queryClient';
import useAuthQueryData from '@hooks/useAuthQueryData';
import userApis from '../apis/userApis';

function useLogoutUser() {
	const { setAuthQueryData } = useAuthQueryData();
	const mutation = useMutation({
		mutationKey: userKeys.logout,
		mutationFn: userApis.logout,
	});

	const removeUserQueries = () => {
		queryClient.removeQueries({
			queryKey: userKeys.all,
		});
	};

	const initialiseAuthQueryData = () => {
		setAuthQueryData({
			isAuth: false,
		});
	};

	const initialiseQueriesAfterMutation = () => {
		removeUserQueries();
		initialiseAuthQueryData();
	};

	return {
		...mutation,
		logoutUser: mutation.mutate,
		initialiseQueriesAfterMutation,
	};
}

export default useLogoutUser;
