import { Review, IReviewInput, IReviewModel } from './reviewModel';

class ReviewDAO {
	async create(reviewInput: IReviewInput): Promise<IReviewModel> {
		return Review.create(reviewInput);
	}
}

export const reviewDAO = new ReviewDAO();
