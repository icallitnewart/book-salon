import { likeDAO } from './likeDAO';
import { IBook, ILike, LikeType } from './likeModel';

import { HttpError } from '../../utils/HttpError';
import { IGetLikedBooks } from '../../types/like';

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

	async checkBookLike(userId: string, isbn: string): Promise<boolean> {
		const isLiked = await likeDAO.checkExistence(userId, LikeType.BOOK, isbn);
		return isLiked;
	}

	async getLikedBooks({
		userId,
		page = 1,
		perPage = 10,
		pageGroupSize = 10,
	}: IGetLikedBooks) {
		const [books, remainingItems] = await likeDAO.findBooksByUserWithCount(
			userId,
			page,
			perPage,
			pageGroupSize,
		);

		const pageInfo = this.calculatePagination(
			remainingItems,
			page,
			perPage,
			pageGroupSize,
		);

		return {
			books,
			pageInfo,
		};
	}

	private calculatePagination(
		remainingItems: number,
		currentPage: number,
		itemsPerPage: number,
		pageGroupSize: number,
	) {
		// 현재 페이지가 속한 그룹이 몇번째 그룹인지 계산
		const currentGroup = Math.ceil(currentPage / pageGroupSize);
		// 카운트한 문서 수를 기반으로 마지막 페이지 번호 계산
		const lastPageOfRemainingItems =
			currentPage + Math.ceil(remainingItems / itemsPerPage) - 1;
		// 현재 그룹의 최대 마지막 페이지 번호 계산
		const maxPageOfCurrentGroup = currentGroup * pageGroupSize;
		// 마지막 페이지 번호
		const lastPage = Math.min(maxPageOfCurrentGroup, lastPageOfRemainingItems);

		return {
			lastPage,
			hasNextPage: lastPageOfRemainingItems > lastPage,
		};
	}
}

export const likeService = new LikeService();
