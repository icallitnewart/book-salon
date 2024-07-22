import authAxios from '@config/axiosInstance/authAxios';

import { APIS } from '@constants/apis';
import { IErrorResponse } from '@typeDefs/apiError';
import { IUserInfo, IUserLogin } from '../types/userData';

const userApis = {
	login: async (
		credentials: IUserLogin,
	): Promise<IUserInfo | IErrorResponse> => {
		const response = await authAxios.post(APIS.USER.LOGIN, credentials);
		return response.data.user;
	},
};

export default userApis;
