const USER_BASE_URL = '/user';

export const ROUTES = {
	MAIN: '/',
	USER: {
		REGISTER: `${USER_BASE_URL}/register`,
		LOGIN: `${USER_BASE_URL}/login`,
		MY_PROFILE: `${USER_BASE_URL}/profile`,
		PROFILE_EDIT: `${USER_BASE_URL}/profile/edit`,
	},
};
