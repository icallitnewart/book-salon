import axios from 'axios';

import { APIS } from '../../constants/apis';
import { ROUTES } from '../../constants/routes';

import { handleApiError } from '../utils/errorHandler';

// TODO: 에러 메시지 상수화 필요
const LOGIN_ERROR_MESSAGE = '로그인이 필요한 서비스입니다.';

export const authAxios = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	withCredentials: true,
});

authAxios.interceptors.response.use(
	response => {
		return response;
	},
	async error => {
		if (error.response) {
			const {
				status,
				data: { field, message },
			} = error.response;

			if (status === 401 && field === 'auth') {
				// TODO: 판단 방법 변경 필요
				// invalid token
				if (message !== LOGIN_ERROR_MESSAGE) {
					try {
						await axios.post(APIS.USER.LOGOUT, null, { withCredentials: true });
					} catch (err) {
						handleApiError(err);
					}
				}

				alert(LOGIN_ERROR_MESSAGE);
				window.location.href = ROUTES.USER.LOGIN;

				// end promise chain
				return new Promise<never>(() => {});
			}
		}

		return Promise.reject(error);
	},
);
