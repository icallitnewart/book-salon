import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@config/query/queryClient';
import { userKeys } from '@config/query/queryKeys';
import useAuthQueryData from '@hooks/useAuthQueryData';
import { IUserDelete } from '../types/userData';
import userApis from '../apis/userApis';

function useDeleteUser() {
	const { setAuthQueryData } = useAuthQueryData();
	const mutation = useMutation({
		mutationKey: userKeys.delete,
		mutationFn: (formData: IUserDelete) => userApis.delete(formData),
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
		deleteUser: mutation.mutate,
		initialiseQueriesAfterMutation,
	};
}

export default useDeleteUser;
