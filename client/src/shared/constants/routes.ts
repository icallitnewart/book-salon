const USER_BASE_URL = '/user';
const BOOK_BASE_URL = '/book';
const BOOK_REVIEW_URL = `${BOOK_BASE_URL}/review`;
const BOOK_QUOTE_URL = `${BOOK_BASE_URL}/quote`;

export const ROUTES = {
	MAIN: '/',
	USER: {
		REGISTER: `${USER_BASE_URL}/register`,
		LOGIN: `${USER_BASE_URL}/login`,
		MY_PROFILE: `${USER_BASE_URL}/profile`,
		PROFILE_EDIT: `${USER_BASE_URL}/profile/edit`,
	},
	BOOK: {
		REVIEW: {
			LIST: `${BOOK_REVIEW_URL}/list`,
		},
		QUOTE: {
			LIST: `${BOOK_QUOTE_URL}/list`,
		},
	},
};
