import { typeGuards } from '@typeDefs/typeGuards';
import { IBookDetail } from './bookData';

export const isValidBookDetail = (book: unknown): book is IBookDetail => {
	return (
		typeGuards.isObject(book) &&
		typeGuards.hasKey<IBookDetail, 'isbn'>(book, 'isbn') &&
		typeGuards.isString(book.isbn) &&
		typeGuards.hasKey<IBookDetail, 'title'>(book, 'title') &&
		typeGuards.isString(book.title) &&
		typeGuards.hasKey<IBookDetail, 'author'>(book, 'author') &&
		typeGuards.isString(book.author) &&
		typeGuards.hasKey<IBookDetail, 'description'>(book, 'description') &&
		typeGuards.isString(book.description) &&
		typeGuards.hasKey<IBookDetail, 'category'>(book, 'category') &&
		typeGuards.isString(book.category) &&
		typeGuards.hasKey<IBookDetail, 'cover'>(book, 'cover') &&
		typeGuards.isString(book.cover) &&
		typeGuards.hasKey<IBookDetail, 'publisher'>(book, 'publisher') &&
		typeGuards.isString(book.publisher) &&
		typeGuards.hasKey<IBookDetail, 'pubDate'>(book, 'pubDate') &&
		typeGuards.isString(book.pubDate)
	);
};
