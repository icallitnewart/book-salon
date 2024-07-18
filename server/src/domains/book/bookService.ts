import axios from 'axios';

import API_URL from '../../constants/api';
import { ERROR_MESSAGE } from '../../constants/errorMessage';

import { testRegex } from '../../utils/validator';
import { HttpError } from '../../utils/HttpError';

export interface IBestsellerWeek {
	year: number;
	month: number;
	week: number;
}

class BookService {
	constructor() {
		const { TTB_KEY, ALADIN_BASE_API_URL, ALADIN_LIST_API_URL } = process.env;

		if (!TTB_KEY) {
			throw new Error(ERROR_MESSAGE.ENV_MISSING.TTB_KEY);
		}

		if (!ALADIN_BASE_API_URL) {
			throw new Error(ERROR_MESSAGE.ENV_MISSING.ALADIN_BASE_API_URL);
		}

		if (!ALADIN_LIST_API_URL) {
			throw new Error(ERROR_MESSAGE.ENV_MISSING.ALADIN_LIST_API_URL);
		}
	}

	async getBestsellerListByWeek(query: IBestsellerWeek | undefined) {
		const baseUrl = API_URL.ALADIN_BESTSELLER_LIST;
		const maxResults = 10;
		let url = `${baseUrl}&MaxResults=${maxResults}`;

		if (query) {
			const { year, month, week } = query;
			const date = `&Year=${year}&Month=${month}&Week=${week}`;
			url += date;
		}

		const { data } = await axios.get(url);

		if (data.errorMessage) {
			throw new HttpError(data.errorMessage, 400);
		}

		if (!data.item) {
			throw new HttpError('데이터를 찾을 수 없습니다.', 404);
		}

		return data.item;
	}

	async getBookDetailByISBN(isbn: string) {
		if (testRegex.isbn(isbn) === false) {
			throw new HttpError('올바른 ISBN 형식이 아닙니다.', 400);
		}

		const baseUrl = API_URL.ALADIN_BOOK_DETAIL;
		const url = `${baseUrl}&ItemId=${isbn}`;

		const { data } = await axios.get(url);

		if (data.errorMessage) {
			if (data.errorCode === 8) {
				throw new HttpError('데이터를 찾을 수 없습니다.', 404);
			}

			throw new HttpError(data.errorMessage, 400);
		}

		if (!data.item || data.item.length === 0) {
			throw new HttpError('데이터를 찾을 수 없습니다.', 404);
		}

		return data.item[0];
	}
}

export const bookService = new BookService();
