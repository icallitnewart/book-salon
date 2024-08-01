import { OrderQuery } from '../../types/review';
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

	async findReviewsByOrder(
		page: number,
		perPage: number,
		order: OrderQuery,
	): Promise<IReviewModel[]> {
		const skip = (page - 1) * perPage;
		let sortOption: { [key: string]: 1 | -1 };

		switch (order) {
			case 'mostViewed':
				sortOption = { viewCount: -1, _id: -1 };
				break;
			case 'latest':
				sortOption = { createdAt: -1, _id: -1 };
				break;
			default:
				throw new Error('Invalid order option');
		}

		return Review.find()
			.sort(sortOption)
			.skip(skip)
			.limit(perPage)
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
		perPage: number,
		pageGroupSize: number,
	): Promise<number> {
		// 한 번에 가져올 수 있는 최대 문서 수
		const maxDocsPerGroup = pageGroupSize * perPage;
		// 총 skip할 문서 수
		const totalSkip = (page - 1) * perPage;

		// 가져올 문서 수
		const docsToCount =
			totalSkip > maxDocsPerGroup
				? maxDocsPerGroup - (totalSkip % maxDocsPerGroup)
				: maxDocsPerGroup - totalSkip;

		return Review.countDocuments()
			.skip(totalSkip)
			.limit(docsToCount + 1);
	}
}

export const reviewDAO = new ReviewDAO();
