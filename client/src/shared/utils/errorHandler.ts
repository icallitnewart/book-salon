import { isAxiosError } from 'axios';

import { IErrorResponse } from '@typeDefs/apiError';

export const handleApiError = (error: unknown): IErrorResponse => {
	const UNKNOWN_ERROR = '알 수 없는 에러 발생';

	if (isAxiosError(error) && error.response) {
		const { status, data } = error.response;
		const response: IErrorResponse = {
			status,
			message: data.message || UNKNOWN_ERROR,
		};
		if (data.field) response.field = data.field;
		return response;
	}
	return { status: 500, message: UNKNOWN_ERROR };
};
