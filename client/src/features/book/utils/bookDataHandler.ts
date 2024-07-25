import { IBookData, IBookInfo } from '../types/bookDetail';

export const refineBookData = (book: IBookData): IBookInfo => {
	return {
		...book,
		category: book.categoryName.replaceAll('>', ' > '),
		isbn: book.isbn13,
	};
};
