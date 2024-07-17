import { Request, Response } from 'express';

import { bookService, IBestsellerWeek } from './bookService';

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

		const { data } = await bookService.getBestsellerListByWeek(parsedQuery);

		if (data.errorMessage) {
			throw new HttpError(data.errorMessage, 400);
		}

		if (!data.item) {
			throw new HttpError('데이터를 찾을 수 없습니다.', 404);
		}

		res.json({
			result: 'success',
			books: data.item,
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
