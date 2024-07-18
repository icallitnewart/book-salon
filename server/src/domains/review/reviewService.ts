import { Types } from 'mongoose';
import { reviewDAO } from './reviewDAO';
import { IReviewInput } from './reviewModel';
import { HttpError } from '../../utils/HttpError';

class ReviewService {
	async createReview(
		reviewInput: Omit<IReviewInput, 'userId'>,
		userId: string,
	): Promise<string> {
		const review = {
			...reviewInput,
			userId: new Types.ObjectId(userId),
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
}

export const reviewService = new ReviewService();
