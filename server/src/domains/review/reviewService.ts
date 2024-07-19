import { reviewDAO } from './reviewDAO';
import { IReviewInput } from './reviewModel';
import { HttpError } from '../../utils/HttpError';

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

	async findReviewById(reviewId: string) {
		const review = await reviewDAO.findById(reviewId);

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

	private validateUpdateReviewData(data: Partial<IReviewInput>) {
		const allowedFields = ['title', 'content', 'rating', 'tags'];
		if (!Object.keys(data).every(key => allowedFields.includes(key))) {
			throw new HttpError('유효하지 않은 리뷰 데이터입니다.', 400);
		}

		if (Object.keys(data).length === 0) {
			throw new HttpError('수정할 리뷰 데이터가 없습니다.', 400);
		}
	}

	private async validateReviewOwnership(reviewId: string, userId: string) {
		const review = await reviewDAO.findById(reviewId);

		if (!review) {
			throw new HttpError('리뷰를 찾을 수 없습니다.', 404);
		}

		if (review.user.id.toString() !== userId) {
			throw new HttpError('리뷰를 수정할 권한이 없습니다.', 403);
		}
	}
}

export const reviewService = new ReviewService();
