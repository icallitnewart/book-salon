import axios from 'axios';
import authAxios from '@config/axiosInstance/authAxios';

import { APIS } from '@constants/apis';
import {
	IUserAuth,
	IUserInfo,
	IUserLogin,
	IUserRegister,
} from '../types/userData';

const userApis = {
	register: async (formData: IUserRegister): Promise<void> => {
		await axios.post(APIS.USER.REGISTER, formData);
	},
	login: async (credentials: IUserLogin): Promise<IUserInfo> => {
		const response = await authAxios.post(APIS.USER.LOGIN, credentials);
		return response.data.user;
	},
	getAuth: async (): Promise<IUserAuth> => {
		const response = await authAxios.get(APIS.USER.AUTH);
		const { isAuth, user } = response.data;

		return {
			isAuth,
			...(user && { user }),
		};
	},
	logout: async (): Promise<void> => {
		await authAxios.post(APIS.USER.LOGOUT, null);
	},
};

export default userApis;
