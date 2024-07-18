import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { reviewService } from './reviewService';
import { HttpError } from '../../utils/HttpError';

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

		const review = await reviewService.findReviewById(reviewId);

		res.status(200).json({
			result: 'success',
			review,
		});
	}
}

export const reviewController = new ReviewController();
