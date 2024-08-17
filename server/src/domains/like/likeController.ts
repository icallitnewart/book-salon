import { Request, Response } from 'express';
import { likeService } from './likeService';

import { HttpError } from '../../utils/HttpError';
import { testRegex } from '../../utils/validator';

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
