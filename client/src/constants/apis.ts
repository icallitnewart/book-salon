const API_BASE_URL = 'http://localhost:5000/api';
const USER_BASE_URL = `${API_BASE_URL}/users`;

export const APIS = {
	USER: {
		LOGIN: `${USER_BASE_URL}/login`,
		REGISTER: `${USER_BASE_URL}`,
		UPDATE: `${USER_BASE_URL}`,
	},
};
