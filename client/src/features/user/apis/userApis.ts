import authAxios from '@config/axiosInstance/authAxios';

import { APIS } from '@constants/apis';
import { IErrorResponse } from '@typeDefs/apiError';
import { IUserAuth, IUserInfo, IUserLogin } from '../types/userData';

const userApis = {
	login: async (
		credentials: IUserLogin,
	): Promise<IUserInfo | IErrorResponse> => {
		const response = await authAxios.post(APIS.USER.LOGIN, credentials);
		return response.data.user;
	},
	getAuth: async (): Promise<IUserAuth | IErrorResponse> => {
		const response = await authAxios.get(APIS.USER.AUTH);
		const { isAuth, user } = response.data;

		return {
			isAuth,
			...(user && { user }),
		};
	},
};

export default userApis;
