import {
	Review,
	IReviewInput,
	IReviewModel,
	IReviewInputWithUser,
} from './reviewModel';

class ReviewDAO {
	async create(reviewInput: IReviewInputWithUser): Promise<IReviewModel> {
		return Review.create(reviewInput);
	}

	async findById(reviewId: string): Promise<IReviewModel | null> {
		return Review.findById(reviewId).populate('user', 'id nickname');
	}

	async update(
		reviewId: string,
		reviewData: Partial<IReviewInput>,
	): Promise<IReviewModel | null> {
		return Review.findByIdAndUpdate(reviewId, reviewData, {
			new: true,
		}).populate('user', 'id nickname');
	}
}

export const reviewDAO = new ReviewDAO();
