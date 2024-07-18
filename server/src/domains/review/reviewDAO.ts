import { Review, IReviewInput, IReviewModel } from './reviewModel';

class ReviewDAO {
	async create(reviewInput: IReviewInput): Promise<IReviewModel> {
		return Review.create(reviewInput);
	}

	async findById(reviewId: string): Promise<IReviewModel | null> {
		return Review.findById(reviewId).populate('user', 'id nickname');
	}
}

export const reviewDAO = new ReviewDAO();
