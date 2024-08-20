import { Request, Response } from 'express';
import { likeService } from './likeService';

import { HttpError } from '../../utils/HttpError';
import { testRegex } from '../../utils/validator';
import { strToNum } from '../../utils/parser';
import { IPageQuery } from '../../types/common';

class LikeController {
	addBookLike = async (req: Request, res: Response) => {
		const { userId } = req;
		this.validateUserId(userId);

		const book = req.body;
		const { isbn } = book;
		this.validateIsbn(isbn);

		await likeService.addBookLike(userId, isbn, book);

		res.status(201).json({
			result: 'success',
			liked: true,
		});
	};

	removeBookLike = async (req: Request, res: Response) => {
		const { userId } = req;
		this.validateUserId(userId);

		const { isbn } = req.params;
		this.validateIsbn(isbn);

		const isDeleted = await likeService.removeBookLike(userId, isbn);

		res.status(200).json({
			result: 'success',
			liked: !isDeleted,
		});
	};

	checkBookLike = async (req: Request, res: Response) => {
		const { userId } = req;
		this.validateUserId(userId);

		const { isbn } = req.params;
		this.validateIsbn(isbn);

		const isLiked = await likeService.checkBookLike(userId, isbn);

		res.status(200).json({
			result: 'success',
			liked: isLiked,
		});
	};

	getLikedBooks = async (req: Request, res: Response) => {
		const { userId } = req;
		this.validateUserId(userId);

		const { page, perPage, pageGroupSize } = req.query as IPageQuery;
		const parsedPage = this.validateAndParsePageQuery(page, 'page');
		const parsedPerPage = this.validateAndParsePageQuery(perPage, 'perPage');
		const parsedPageGroupSize = this.validateAndParsePageQuery(
			pageGroupSize,
			'pageGroupSize',
		);

		const { books, pageInfo } = await likeService.getLikedBooks({
			userId,
			page: parsedPage,
			perPage: parsedPerPage,
			pageGroupSize: parsedPageGroupSize,
		});

		res.status(200).json({
			result: 'success',
			books,
			pageInfo,
		});
	};

	private validateAndParsePageQuery(
		query?: string,
		queryName?: string,
	): number | undefined {
		if (query === undefined) return query;

		const parsedQuery = strToNum(query);
		if (Number.isNaN(parsedQuery)) {
			throw new HttpError(`${queryName} 쿼리는 숫자여야 합니다.`, 400);
		}

		if (parsedQuery < 1) {
			throw new HttpError(`${queryName} 쿼리는 1 이상이어야 합니다.`, 400);
		}

		return parsedQuery;
	}

	private validateUserId(userId?: string): asserts userId is string {
		if (!userId) {
			throw new HttpError('userId가 존재하지 않습니다.', 401);
		}
	}

	private validateIsbn(isbn?: string) {
		if (!isbn || !testRegex.isbn(isbn)) {
			throw new HttpError('유효하지 않은 도서 정보입니다.', 400);
		}
	}
}

export const likeController = new LikeController();
