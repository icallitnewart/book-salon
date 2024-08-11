import { Request, Response } from 'express';

import { bookService, IBestsellerWeek } from './bookService';
import { ISearchBooksQuery } from '../../types/book';

import { HttpError } from '../../utils/HttpError';
import { isNumber, isUndefined } from '../../utils/typeGuard';
import { isInRange } from '../../utils/validator';
import { strToNum } from '../../utils/parser';

interface IBestsellerQuery {
	year?: string;
	month?: string;
	week?: string;
}

class BookController {
	getBestsellerList = async (req: Request, res: Response) => {
		const query = req.query as IBestsellerQuery;

		if (!this.isValidBestsellerQuery(query)) {
			throw new HttpError('잘못된 쿼리 형식입니다.', 400);
		}

		const parsedQuery = this.parseBestsellerQuery(query);

		const books = await bookService.getBestsellerListByWeek(parsedQuery);

		res.json({
			result: 'success',
			books,
		});
	};

	async getBookDetail(req: Request, res: Response) {
		const { isbn } = req.params;
		if (!isbn) {
			throw new HttpError('ISBN이 제공되지 않았습니다.', 400);
		}

		const book = await bookService.getBookDetailByISBN(isbn);

		res.json({
			result: 'success',
			book,
		});
	}

	searchBooks = async (req: Request, res: Response) => {
		const { searchTerm } = req.params;
		if (!searchTerm) {
			throw new HttpError('검색어가 제공되지 않았습니다.', 400);
		}

		const query = req.query as unknown as ISearchBooksQuery;
		if (!this.isValidSearchBooksQuery(query)) {
			throw new HttpError('잘못된 쿼리 형식입니다.', 400);
		}

		const books = await bookService.searchBooks(searchTerm, query);

		res.json({
			result: 'success',
			books,
		});
	};

	private parseBestsellerQuery(
		query: Required<IBestsellerQuery>,
	): IBestsellerWeek | undefined {
		const { year, month, week } = query;
		if (!year && !month && !week) return undefined;

		return {
			year: strToNum(year),
			month: strToNum(month),
			week: strToNum(week),
		};
	}

	private isValidSearchBooksQuery(
		query: ISearchBooksQuery,
	): query is ISearchBooksQuery {
		const { maxResults, startPage } = query;

		const isValidNumber = (value: string) => {
			const numericValue = strToNum(value);
			return isNumber(numericValue) && numericValue > 0;
		};

		if (maxResults && !isValidNumber(maxResults)) return false;
		if (startPage && !isValidNumber(startPage)) return false;

		return true;
	}

	private isValidBestsellerQuery(
		query: IBestsellerQuery,
	): query is Required<IBestsellerQuery> {
		const { year, month, week } = query;

		if (isUndefined(year) && isUndefined(month) && isUndefined(week))
			return true;
		if (!year || !month || !week) return false;

		const isValidNumber = (value: string, min: number, max: number) => {
			const numericValue = strToNum(value);
			return isNumber(numericValue) && isInRange(numericValue, min, max);
		};

		return (
			isValidNumber(year, 2000, 2100) &&
			isValidNumber(month, 1, 12) &&
			isValidNumber(week, 1, 5)
		);
	}
}

export const bookController = new BookController();
