import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { commentService } from './commentService';
import { reviewService } from '../review/reviewService';
import { HttpError } from '../../utils/HttpError';

class CommentController {
	createCommentInReview = async (req: Request, res: Response) => {
		const { userId } = req;
		this.validateUserId(userId);

		const { reviewId } = req.params;
		this.validateReviewId(reviewId);
		await this.validateReview(reviewId);

		const commentInput = req.body;
		const comment = await commentService.createCommentInReview(
			commentInput,
			userId,
			reviewId,
		);

		res.status(201).json({
			result: 'success',
			comment,
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

	private async validateReview(reviewId: string): Promise<void> {
		const review = await reviewService.getReview(reviewId);

		if (!review) {
			throw new HttpError('review가 존재하지 않습니다.', 404);
		}
	}
}

export const commentController = new CommentController();
