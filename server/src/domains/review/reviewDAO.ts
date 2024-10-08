import { FilterQuery } from 'mongoose';
import { SortOption } from '../../types/review';
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

	async increaseViewCount(reviewId: string): Promise<IReviewModel | null> {
		return Review.findByIdAndUpdate(
			reviewId,
			{ $inc: { viewCount: 1 } },
			{ new: true },
		);
	}

	async increaseCommentCount(reviewId: string): Promise<IReviewModel | null> {
		return Review.findByIdAndUpdate(
			reviewId,
			{ $inc: { commentCount: 1 } },
			{ new: true },
		);
	}

	async decreaseCommentCount(reviewId: string): Promise<IReviewModel | null> {
		return Review.findByIdAndUpdate(
			reviewId,
			{ $inc: { commentCount: -1 } },
			{ new: true },
		);
	}

	async findBySort(
		page: number,
		perPage: number,
		sort: SortOption,
		query: FilterQuery<IReviewModel> = {},
	): Promise<IReviewModel[]> {
		const skip = (page - 1) * perPage;
		let sortOption: { [key: string]: 1 | -1 };

		switch (sort) {
			case 'mostViewed':
				sortOption = { viewCount: -1, _id: -1 };
				break;
			case 'latest':
				sortOption = { createdAt: -1, _id: -1 };
				break;
			default:
				throw new HttpError('유효하지 않은 sort입니다.', 400);
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

	findBySortWithCount = async (
		page: number,
		perPage: number,
		pageGroupSize: number,
		sort: SortOption,
		query: FilterQuery<IReviewModel> = {},
	): Promise<[IReviewModel[], number]> => {
		return Promise.all([
			this.findBySort(page, perPage, sort, query),
			this.countDocumentsWithLimit(page, perPage, pageGroupSize, query),
		]);
	};

	findByIsbnWithCount = async (
		page: number,
		perPage: number,
		pageGroupSize: number,
		sort: SortOption,
		isbn: string,
	): Promise<[IReviewModel[], number]> => {
		return this.findBySortWithCount(page, perPage, pageGroupSize, sort, {
			'book.isbn': isbn,
		});
	};

	async findByQuery(
		page: number,
		perPage: number,
		query: FilterQuery<IReviewModel> = {},
	): Promise<IReviewModel[]> {
		const skip = (page - 1) * perPage;

		return Review.find(query)
			.skip(skip)
			.limit(perPage)
			.populate('user', 'id nickname')
			.lean();
	}

	findBySearchTermWithCount = async (
		page: number,
		perPage: number,
		pageGroupSize: number,
		searchTerm: string,
	): Promise<[IReviewModel[], number]> => {
		const searchRegex = new RegExp(searchTerm, 'i');
		const query = {
			$or: [{ title: searchRegex }, { content: searchRegex }],
		};

		return Promise.all([
			this.findByQuery(page, perPage, query),
			this.countDocumentsWithLimit(page, perPage, pageGroupSize, query),
		]);
	};
}

export const reviewDAO = new ReviewDAO();
