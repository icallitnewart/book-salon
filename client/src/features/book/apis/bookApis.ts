import axios from 'axios';

import { APIS } from '@constants/apis';
import { IBookData, IBookDetail, IBookPageOptions } from '../types/bookData';

import { refineBookData } from '../utils/bookDataHandler';

const bookApis = {
	getBestsellerList: async () => {
		const response = await axios.get(APIS.BOOK.BESTSELLER);
		return response.data.books;
	},
	getBookDetail: async (bookId: string) => {
		const response = await axios.get(APIS.BOOK.DETAIL(bookId));
		return response.data.book;
	},
	searchBooks: async (
		searchTerm: string,
		pageOptions: IBookPageOptions,
	): Promise<IBookDetail[]> => {
		const { data } = await axios.get(APIS.BOOK.SEARCH(searchTerm, pageOptions));
		const refinedBooks = data.books.map((book: IBookData) =>
			refineBookData(book),
		);
		return refinedBooks;
	},
};

export default bookApis;
