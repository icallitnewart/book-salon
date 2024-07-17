import axios from 'axios';

import API_URL from '../../constants/api';
import { ERROR_MESSAGE } from '../../constants/errorMessage';

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

		const response = await axios.get(url);
		return response;
	}
}

export const bookService = new BookService();
