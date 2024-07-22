import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { userKeys } from '@config/query/queryKeys';
import { queryClient } from '@config/query/queryClient';
import { ROUTES } from '@constants/routes';
import { handleApiError } from '@utils/errorHandler';
import userApis from '../apis/userApis';

function useLogoutUser() {
	const navigate = useNavigate();
	const mutation = useMutation({
		mutationKey: userKeys.logout,
		mutationFn: userApis.logout,
		onSuccess: () => {
			alert('로그아웃 되었습니다.');
			navigate(ROUTES.MAIN);
			queryClient.removeQueries({ queryKey: userKeys.all });
		},
		onError: err => {
			const error = handleApiError(err);
			if (error) {
				alert('로그아웃에 실패하였습니다. 다시 시도해주세요.');
			}
		},
	});

	return mutation;
}

export default useLogoutUser;
