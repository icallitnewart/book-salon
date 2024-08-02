import { reviewDAO } from './reviewDAO';
import { IReviewInput } from './reviewModel';
import { HttpError } from '../../utils/HttpError';

import { OrderQuery } from '../../types/review';

class ReviewService {
	async createReview(
		reviewInput: IReviewInput,
		userId: string,
	): Promise<string> {
		const review = {
			...reviewInput,
			user: userId,
		};

		const newReview = await reviewDAO.create(review);
		const reviewId = newReview.id.toString();

		return reviewId;
	}

	async getReviewWithViewCountIncrement(reviewId: string) {
		const review = await reviewDAO.findByIdAndIncreaseViewCount(reviewId);

		if (!review) {
			throw new HttpError('리뷰를 찾을 수 없습니다.', 404);
		}

		return review;
	}

	updateReview = async (
		reviewId: string,
		reviewData: Partial<IReviewInput>,
		userId: string,
	) => {
		this.validateUpdateReviewData(reviewData);
		await this.validateReviewOwnership(reviewId, userId);
		const updatedReview = await reviewDAO.update(reviewId, reviewData);

		if (!updatedReview) {
			throw new HttpError('리뷰 업데이트에 실패하였습니다.', 500);
		}

		return updatedReview;
	};

	async deleteReview(reviewId: string, userId: string): Promise<void> {
		await this.validateReviewOwnership(reviewId, userId);
		await reviewDAO.delete(reviewId);
	}

	private validateUpdateReviewData(data: Partial<IReviewInput>) {
		const allowedFields = ['title', 'content', 'rating', 'tags', 'book'];
		if (!Object.keys(data).every(key => allowedFields.includes(key))) {
			throw new HttpError('유효하지 않은 리뷰 데이터입니다.', 400);
		}

		if (Object.keys(data).length === 0) {
			throw new HttpError('수정할 리뷰 데이터가 없습니다.', 400);
		}
	}

	async getReviewsByOrder(
		page = 1,
		perPage = 10,
		pageGroupSize = 10,
		order = 'latest' as OrderQuery,
	) {
		const [reviews, totalItems] = await Promise.all([
			reviewDAO.findReviewsByOrder(page, perPage, order),
			reviewDAO.countDocumentsWithLimit(page, perPage, pageGroupSize),
		]);

		const pageInfo = this.calculatePagination(
			totalItems,
			page,
			perPage,
			pageGroupSize,
		);

		return {
			reviews,
			pageInfo,
		};
	}

	private async validateReviewOwnership(reviewId: string, userId: string) {
		const review = await reviewDAO.findById(reviewId);

		if (!review) {
			throw new HttpError('리뷰를 찾을 수 없습니다.', 404);
		}

		if (review.user.id.toString() !== userId) {
			throw new HttpError('이 리뷰에 대한 권한이 없습니다.', 403);
		}
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

export const reviewService = new ReviewService();
