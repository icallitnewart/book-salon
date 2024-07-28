const API_BASE_URL = 'http://localhost:5000/api';
const USER_BASE_URL = `${API_BASE_URL}/users`;
const BOOK_BASE_URL = `${API_BASE_URL}/books`;

export const APIS = {
	USER: {
		LOGIN: `${USER_BASE_URL}/login`,
		REGISTER: `${USER_BASE_URL}`,
		UPDATE: `${USER_BASE_URL}`,
		DELETE: `${USER_BASE_URL}`,
		LOGOUT: `${USER_BASE_URL}/logout`,
		AUTH: `${USER_BASE_URL}/auth`,
	},
	BOOK: {
		BESTSELLER: `${BOOK_BASE_URL}/bestseller`,
		DETAIL: (bookId: string) => `${BOOK_BASE_URL}/detail/${bookId}`,
	},
	REVIEW: {
		ADD: `${API_BASE_URL}/reviews`,
		DETAIL: (reviewId: string) => `${API_BASE_URL}/reviews/${reviewId}`,
		UPDATE: (reviewId: string) => `${API_BASE_URL}/reviews/${reviewId}`,
		DELETE: (reviewId: string) => `${API_BASE_URL}/reviews/${reviewId}`,
	},
};
