import { IBookData, IBookDetail } from '../types/bookData';

export const refineBookData = (book: IBookData): IBookDetail => {
	return {
		...book,
		category: book.categoryName.replaceAll('>', ' > '),
		isbn: book.isbn13,
	};
};
