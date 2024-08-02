import { FilterQuery } from 'mongoose';
import { OrderQuery } from '../../types/review';
import {
	Review,
	IReviewInput,
	IReviewModel,
	IReviewInputWithUser,
} from './reviewModel';
import { HttpError } from '../../utils/HttpError';

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

	async findByOrder(
		page: number,
		perPage: number,
		order: OrderQuery,
		query: FilterQuery<IReviewModel> = {},
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
				throw new HttpError('유효하지 않은 order입니다.', 400);
		}

		return Review.find(query)
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
		query: FilterQuery<IReviewModel> = {},
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
		return Review.countDocuments(query).skip(totalSkip).limit(docsToCount);
	}

	findByOrderWithCount = async (
		page: number,
		perPage: number,
		pageGroupSize: number,
		order: OrderQuery,
		query: FilterQuery<IReviewModel> = {},
	): Promise<[IReviewModel[], number]> => {
		return Promise.all([
			this.findByOrder(page, perPage, order, query),
			this.countDocumentsWithLimit(page, perPage, pageGroupSize, query),
		]);
	};

	findByIsbnWithCount = async (
		page: number,
		perPage: number,
		pageGroupSize: number,
		order: OrderQuery,
		isbn: string,
	): Promise<[IReviewModel[], number]> => {
		return this.findByOrderWithCount(page, perPage, pageGroupSize, order, {
			'book.isbn': isbn,
		});
	};
}

export const reviewDAO = new ReviewDAO();
