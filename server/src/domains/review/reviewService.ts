import { Types } from 'mongoose';
import { reviewDAO } from './reviewDAO';
import { IReviewInput } from './reviewModel';

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
}

export const reviewService = new ReviewService();
