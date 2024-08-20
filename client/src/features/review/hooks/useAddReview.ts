import { useMutation } from '@tanstack/react-query';
import { reviewKeys } from '@config/query/queryKeys';

import reviewApis from '../apis/reviewApis';

function useAddReview() {
	const mutation = useMutation({
		mutationKey: reviewKeys.add,
		mutationFn: reviewApis.addReview,
	});

	return {
		...mutation,
		addReview: mutation.mutate,
	};
}

export default useAddReview;
