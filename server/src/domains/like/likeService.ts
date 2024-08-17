import { likeDAO } from './likeDAO';
import { IBook, LikeType } from './likeModel';

import { HttpError } from '../../utils/HttpError';

class LikeService {
	async addBookLike(userId: string, isbn: string, book: IBook) {
		const alreadyLiked = await likeDAO.checkExistence(
			userId,
			LikeType.BOOK,
			isbn,
		);

		if (alreadyLiked) {
			throw new HttpError('이미 좋아요를 누른 책입니다.', 409);
		}

		return likeDAO.create(userId, LikeType.BOOK, isbn, book);
	}
}

export const likeService = new LikeService();
