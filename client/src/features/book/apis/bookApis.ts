import axios from 'axios';
import authAxios from '@config/axiosInstance/authAxios';

import { APIS } from '@constants/apis';
import { IBookData, IBookDetail, IBookPageOptions } from '../types/bookData';

import { refineBookData } from '../utils/bookDataHandler';

const bookApis = {
	getBestsellerList: async () => {
		const response = await axios.get(APIS.BOOK.BESTSELLER);
		return response.data.books;
	},
	getBookDetail: async (isbn: string) => {
		const response = await axios.get(APIS.BOOK.DETAIL(isbn));
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
	checkLike: async (isbn: string) => {
		const response = await authAxios.get(APIS.BOOK.CHECK_LIKE(isbn));
		return response.data.liked;
	},
	likeBook: async (bookData: IBookDetail) => {
		const response = await authAxios.post(APIS.BOOK.LIKE, bookData);
		return response.data.liked;
	},
	unlikeBook: async (isbn: string) => {
		const response = await authAxios.delete(APIS.BOOK.UNLIKE(isbn));
		return response.data.liked;
	},
};

export default bookApis;
