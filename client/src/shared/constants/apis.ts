import { IReviewListOptions } from '@config/query/queryKeys';

import { IPageOptions } from '@typeDefs/data';
import { IBookPageOptions } from '@features/book/types/bookData';

import { createQueryString, createReviewListQuery } from '@utils/query';

const API_BASE_URL = 'http://localhost:5000/api';
const USER_BASE_URL = `${API_BASE_URL}/users`;
const BOOK_BASE_URL = `${API_BASE_URL}/books`;
const REVIEW_BASE_URL = `${API_BASE_URL}/reviews`;
const COMMENT_BASE_URL = `${API_BASE_URL}/comments`;
const REVIEW_COMMENT_BASE_URL = `${COMMENT_BASE_URL}/review`;
const LIKE_BASE_URL = `${API_BASE_URL}/likes`;
const BOOK_LIKE_BASE_URL = `${LIKE_BASE_URL}/book`;

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
		DETAIL: (isbn: string) => `${BOOK_BASE_URL}/detail/${isbn}`,
		SEARCH: (searchTerm: string, pageOptions?: IBookPageOptions) => {
			const pagination = pageOptions ?? null;
			const query = createQueryString({
				maxResults: pagination?.maxResults,
				startPage: pagination?.startPage,
			});

			return `${BOOK_BASE_URL}/search/${searchTerm}?${query}`;
		},
		CHECK_LIKE: (isbn: string) => `${BOOK_LIKE_BASE_URL}/${isbn}`,
		LIKE: `${BOOK_LIKE_BASE_URL}`,
		UNLIKE: (isbn: string) => `${BOOK_LIKE_BASE_URL}/${isbn}`,
		MY_LIKE_LIST: (pageOptions: IPageOptions) => {
			const pagination = pageOptions ?? null;
			const query = createQueryString({
				page: pagination?.page,
				perPage: pagination?.perPage,
				pageGroupSize: pagination?.pageGroupSize,
			});

			return `${BOOK_LIKE_BASE_URL}/me?${query}`;
		},
	},
	REVIEW: {
		ADD: `${REVIEW_BASE_URL}`,
		DETAIL: (reviewId: string) => `${REVIEW_BASE_URL}/${reviewId}`,
		UPDATE: (reviewId: string) => `${REVIEW_BASE_URL}/${reviewId}`,
		UPDATE_VIEW_COUNT: (reviewId: string) =>
			`${REVIEW_BASE_URL}/${reviewId}/view-count`,
		DELETE: (reviewId: string) => `${REVIEW_BASE_URL}/${reviewId}`,
		LIST: (options: IReviewListOptions) => {
			const { filters, sort, pagination } = createReviewListQuery(options);

			const query = createQueryString({
				sort: sort.type,
				isbn: filters?.isbn,
				page: pagination?.page,
				perPage: pagination?.perPage,
				pageGroupSize: pagination?.pageGroupSize,
			});

			return `${API_BASE_URL}/reviews/list?${query}`;
		},
		SEARCH: (searchTerm: string, pageOptions?: IPageOptions) => {
			const pagination = pageOptions ?? null;
			const query = createQueryString({
				page: pagination?.page,
				perPage: pagination?.perPage,
				pageGroupSize: pagination?.pageGroupSize,
			});

			return `${REVIEW_BASE_URL}/search/${searchTerm}?${query}`;
		},
		COMMENT_LIST: (reviewId: string) =>
			`${REVIEW_COMMENT_BASE_URL}/${reviewId}`,
		ADD_COMMENT: (reviewId: string) => `${REVIEW_COMMENT_BASE_URL}/${reviewId}`,
		UPDATE_COMMENT: (commentId: string) =>
			`${REVIEW_COMMENT_BASE_URL}/${commentId}`,
		DELETE_COMMENT: (commentId: string) =>
			`${REVIEW_COMMENT_BASE_URL}/${commentId}`,
	},
};
