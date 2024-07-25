const USER_BASE_URL = '/user';
const BOOK_BASE_URL = '/book';
const BOOK_REVIEW_URL = '/review';

export const ROUTES = {
	MAIN: '/',
	USER: {
		REGISTER: `${USER_BASE_URL}/register`,
		LOGIN: `${USER_BASE_URL}/login`,
		MY_PROFILE: `${USER_BASE_URL}/profile`,
		PROFILE_EDIT: `${USER_BASE_URL}/profile/edit`,
	},
	BOOK: {
		DETAIL: (isbn?: string) => `${BOOK_BASE_URL}/detail/${isbn || ':isbn'}`,
	},
	REVIEW: {
		LIST: `${BOOK_REVIEW_URL}/list`,
		DETAIL: `${BOOK_REVIEW_URL}/detail/:reviewId`,
		ADD: `${BOOK_REVIEW_URL}/add`,
	},
};
