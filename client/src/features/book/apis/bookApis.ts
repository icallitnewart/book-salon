import axios from 'axios';

import { APIS } from '@constants/apis';

const bookApis = {
	getBestsellerList: async () => {
		const response = await axios.get(APIS.BOOK.BESTSELLER);
		return response.data.books;
	},
	getBookDetail: async (bookId: string) => {
		const response = await axios.get(APIS.BOOK.DETAIL(bookId));
		return response.data.book;
	},
};

export default bookApis;
