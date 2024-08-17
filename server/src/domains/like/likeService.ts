import { likeDAO } from './likeDAO';
import { IBook, ILike, LikeType } from './likeModel';

import { HttpError } from '../../utils/HttpError';

class LikeService {
	async addBookLike(userId: string, isbn: string, book: IBook): Promise<ILike> {
		const alreadyLiked = await likeDAO.checkExistence(
			userId,
			LikeType.BOOK,
			isbn,
		);

		if (alreadyLiked) {
			throw new HttpError('이미 좋아요를 누른 책입니다.', 409);
		}

		const result = await likeDAO.create(userId, LikeType.BOOK, isbn, book);
		return result;
	}

	async removeBookLike(userId: string, isbn: string): Promise<boolean> {
		const isLiked = await likeDAO.checkExistence(userId, LikeType.BOOK, isbn);
		if (!isLiked) {
			throw new HttpError('좋아요를 누르지 않은 책입니다.', 400);
		}

		const isDeleted = await likeDAO.delete(userId, LikeType.BOOK, isbn);
		if (!isDeleted) {
			throw new HttpError('좋아요 삭제에 실패했습니다.', 500);
		}

		return isDeleted;
	}
}

export const likeService = new LikeService();
