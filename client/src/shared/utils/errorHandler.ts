import { isAxiosError } from 'axios';

import { IErrorResponse } from '@typeDefs/apiError';

export const handleApiError = (error: unknown): IErrorResponse => {
	if (isAxiosError(error) && error.response) {
		const { status, data } = error.response;
		const response: IErrorResponse = {
			status,
			message: data.message,
		};
		if (data.field) response.field = data.field;

		return response;
	}
	return { status: 500, message: '네트워크 에러 발생' };
};
