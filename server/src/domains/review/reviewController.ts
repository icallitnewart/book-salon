import { Request, Response } from 'express';
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
}

export const reviewController = new ReviewController();
