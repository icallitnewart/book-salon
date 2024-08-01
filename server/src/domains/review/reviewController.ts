import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { reviewService } from './reviewService';
import { HttpError } from '../../utils/HttpError';
import { strToNum } from '../../utils/parser';

interface IGetReviewListQuery {
	page?: string;
	limit?: string;
	order?: 'mostViewed';
}

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

		const review =
			await reviewService.getReviewWithViewCountIncrement(reviewId);

		res.status(200).json({
			result: 'success',
			review,
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
		const { limit, page, order } = req.query as IGetReviewListQuery;

		const validatedLimit = this.validateAndParsePageQuery(limit, 'limit');
		const validatedPage = this.validateAndParsePageQuery(page, 'page');

		let result;

		switch (order) {
			case 'mostViewed':
				result = await reviewService.getMostViewedReviews(
					validatedPage,
					validatedLimit,
				);
				break;
			default:
				throw new HttpError('유효하지 않은 리뷰 리스트 type입니다.', 400);
		}

		const { reviews, pageInfo } = result;

		res.status(200).json({
			result: 'success',
			reviews,
			pageInfo,
		});
	};

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
}

export const reviewController = new ReviewController();
