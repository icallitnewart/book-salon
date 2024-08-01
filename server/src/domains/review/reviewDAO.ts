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

	async findByIdAndIncreaseViewCount(
		reviewId: string,
	): Promise<IReviewModel | null> {
		return Review.findByIdAndUpdate(
			reviewId,
			{ $inc: { viewCount: 1 } },
			{
				new: true,
				runValidators: true,
			},
		).populate('user', 'id nickname');
	}

	async findMostViewedReviews(
		page: number,
		limit: number,
	): Promise<IReviewModel[]> {
		const skip = (page - 1) * limit;

		return Review.find()
			.sort({ viewCount: -1, _id: -1 })
			.skip(skip)
			.limit(limit)
			.populate('user', 'id nickname')
			.lean();
	}

	async update(
		reviewId: string,
		reviewData: Partial<IReviewInput>,
	): Promise<IReviewModel | null> {
		return Review.findByIdAndUpdate(reviewId, reviewData, {
			new: true,
		}).populate('user', 'id nickname');
	}

	async delete(reviewId: string): Promise<void> {
		await Review.findByIdAndDelete(reviewId);
	}

	async countDocumentsWithLimit(
		page: number,
		limit: number,
		maxPages: number,
	): Promise<number> {
		// 한 번에 가져올 수 있는 최대 문서 수
		const maxDocsPerSet = maxPages * limit;
		// 총 skip할 문서 수
		const totalSkip = page * limit;
		// 가져올 문서 수
		const docsToCount =
			totalSkip > maxDocsPerSet
				? maxDocsPerSet - (totalSkip % maxDocsPerSet)
				: maxDocsPerSet - totalSkip;

		return Review.countDocuments()
			.skip(totalSkip)
			.limit(docsToCount + 1);
	}
}

export const reviewDAO = new ReviewDAO();
