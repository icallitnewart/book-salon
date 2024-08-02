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
		// 현재 페이지가 속한 그룹이 몇 번째 그룹인지 계산
		const currentGroup = Math.ceil(page / pageGroupSize);
		// 현재 그룹의 시작 페이지 계산
		const firstPageInGroup = (currentGroup - 1) * pageGroupSize + 1;
		// 그룹의 시작 페이지 전까지 건너뛸 문서 수 계산
		const totalSkip = (firstPageInGroup - 1) * perPage;
		// 그룹의 마지막 문서 + 1까지 카운트할 문서 수 계산
		const docsToCount = pageGroupSize * perPage + 1;

		// 현재 속한 페이지 그룹의 문서 수 카운트
		return Review.countDocuments().skip(totalSkip).limit(docsToCount);
	}
}

export const reviewDAO = new ReviewDAO();
