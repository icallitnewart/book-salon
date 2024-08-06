import { reviewService } from '../review/reviewService';
import { commentDAO } from './commentDAO';
import { CommentType, ICommentInput, ICommentWithCount } from './commentModel';

class CommentService {
	async createCommentInReview(
		commentInput: ICommentInput,
		userId: string,
		reviewId: string,
	): Promise<ICommentWithCount> {
		const comment = await commentDAO.createInReview({
			...commentInput,
			user: userId,
			target: {
				type: CommentType.REVIEW,
				item: reviewId,
			},
		});

		const commentCount = await reviewService.increaseCommentCount(reviewId);

		return {
			comment,
			commentCount,
		};
	}
}

export const commentService = new CommentService();
