import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { reviewService } from './reviewService';
import { HttpError } from '../../utils/HttpError';
import { testRegex } from '../../utils/validator';
import { strToNum } from '../../utils/parser';

import {
	IGetReviewListQuery,
	IGetReviewsByIsbnQuery,
	IGetReviewsQuery,
	ISearchReviewsParsedQuery,
	ISearchReviewsQuery,
	SortOption,
} from '../../types/review';

class ReviewController {
	async createReview(req: Request, res: Response) {
		const reviewInput = req.body;
		const { userId } = req;

		if (!userId) {
			throw new HttpError('userId가 존재하지 않습니다.', 401);
		}

		const reviewId = await reviewService.createReview(reviewInput, userId);

		res.status(201).json({
			result: 'success',
			reviewId,
		});
	}

	async getReview(req: Request, res: Response) {
		const { reviewId } = req.params;

		if (!reviewId || !isValidObjectId(reviewId)) {
			throw new HttpError('유효하지 않은 reviewId입니다.', 400);
		}

		const review = await reviewService.getReview(reviewId);

		res.status(200).json({
			result: 'success',
			review,
		});
	}

	async increaseViewCount(req: Request, res: Response) {
		const { reviewId } = req.params;

		if (!reviewId || !isValidObjectId(reviewId)) {
			throw new HttpError('유효하지 않은 reviewId입니다.', 400);
		}

		const viewCount = await reviewService.increaseViewCount(reviewId);

		res.status(200).json({
			result: 'success',
			viewCount,
		});
	}

	updateReview = async (req: Request, res: Response) => {
		const { userId } = req;
		this.validateUserId(userId);

		const { reviewId } = req.params;
		this.validateReviewId(reviewId);

		const reviewData = req.body;
		const updatedReview = await reviewService.updateReview(
			reviewId,
			reviewData,
			userId,
		);

		res.status(200).json({
			result: 'success',
			review: updatedReview,
		});
	};

	deleteReview = async (req: Request, res: Response) => {
		const { userId } = req;
		this.validateUserId(userId);

		const { reviewId } = req.params;
		this.validateReviewId(reviewId);

		await reviewService.deleteReview(reviewId, userId);

		res.status(200).json({
			result: 'success',
		});
	};

	getReviewList = async (req: Request, res: Response) => {
		const { page, perPage, pageGroupSize, sort, isbn } =
			req.query as IGetReviewListQuery;

		const validatedQuery = this.validateReviewListQuery({
			page,
			perPage,
			pageGroupSize,
			sort,
			isbn,
		});

		let result;
		const baseQuery: IGetReviewsQuery = {
			page: validatedQuery.page,
			perPage: validatedQuery.perPage,
			pageGroupSize: validatedQuery.pageGroupSize,
			sort: validatedQuery.sort,
		};

		if (isbn) {
			result = await reviewService.getReviewsByIsbn({ ...baseQuery, isbn });
		} else {
			result = await reviewService.getReviews(baseQuery);
		}

		const { reviews, pageInfo } = result;
		res.status(200).json({
			result: 'success',
			reviews,
			pageInfo,
		});
	};

	searchReviews = async (req: Request, res: Response) => {
		const { searchTerm } = req.params;
		if (!searchTerm) {
			throw new HttpError('searchTerm이 존재하지 않습니다.', 400);
		}

		const { page, perPage, pageGroupSize } = req.query as ISearchReviewsQuery;

		const validatedQuery = this.validateSearchQuery({
			page,
			perPage,
			pageGroupSize,
		});

		const result = await reviewService.searchReviews({
			...validatedQuery,
			searchTerm,
		});

		const { reviews, pageInfo } = result;
		res.status(200).json({
			result: 'success',
			reviews,
			pageInfo,
		});
	};

	private validateSearchQuery({
		page,
		perPage,
		pageGroupSize,
	}: ISearchReviewsQuery): ISearchReviewsParsedQuery {
		return {
			page: this.validateAndParsePageQuery(page, 'page'),
			perPage: this.validateAndParsePageQuery(perPage, 'perPage'),
			pageGroupSize: this.validateAndParsePageQuery(
				pageGroupSize,
				'pageGroupSize',
			),
		};
	}

	private validateReviewListQuery(
		query: IGetReviewListQuery,
	): IGetReviewsQuery | IGetReviewsByIsbnQuery {
		const baseQuery = {
			page: this.validateAndParsePageQuery(query.page, 'page'),
			perPage: this.validateAndParsePageQuery(query.perPage, 'perPage'),
			pageGroupSize: this.validateAndParsePageQuery(
				query.pageGroupSize,
				'pageGroupSize',
			),
			sort: this.validateSortOption(query.sort),
		};

		if (query.isbn) {
			return {
				...baseQuery,
				isbn: this.validateIsbn(query.isbn),
			};
		}

		return baseQuery;
	}

	private validateUserId(userId?: string): asserts userId is string {
		if (!userId) {
			throw new HttpError('userId가 존재하지 않습니다.', 401);
		}
	}

	private validateReviewId(reviewId?: string): asserts reviewId is string {
		if (!reviewId || !isValidObjectId(reviewId)) {
			throw new HttpError('유효하지 않은 reviewId입니다.', 400);
		}
	}

	private validateAndParsePageQuery(
		query?: string,
		queryName?: string,
	): number | undefined {
		if (query === undefined) return query;

		const parsedQuery = strToNum(query);
		if (Number.isNaN(parsedQuery)) {
			throw new HttpError(`${queryName} 쿼리는 숫자여야 합니다.`, 400);
		}

		if (parsedQuery < 1) {
			throw new HttpError(`${queryName} 쿼리는 1 이상이어야 합니다.`, 400);
		}

		return parsedQuery;
	}

	private validateSortOption(sort?: SortOption): SortOption | undefined {
		if (sort === undefined) return sort;
		if (!Object.values(SortOption).includes(sort)) {
			throw new HttpError('유효하지 않은 sort입니다.', 400);
		}
		return sort;
	}

	private validateIsbn(isbn: string): string {
		if (!testRegex.isbn(isbn)) {
			throw new HttpError('유효하지 않은 isbn입니다.', 400);
		}

		return isbn;
	}
}

export const reviewController = new ReviewController();
