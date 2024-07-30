import { IBookDetail } from './bookData';

export const isValidBookDetail = (book?: IBookDetail): book is IBookDetail => {
	return (
		typeof book === 'object' &&
		typeof book.isbn === 'string' &&
		typeof book.title === 'string' &&
		typeof book.author === 'string' &&
		typeof book.description === 'string' &&
		typeof book.category === 'string' &&
		typeof book.cover === 'string' &&
		typeof book.publisher === 'string' &&
		typeof book.pubDate === 'string'
	);
};
