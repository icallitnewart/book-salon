import { HttpError } from '../../utils/HttpError';
import { reviewService } from '../review/reviewService';
import { commentDAO } from './commentDAO';
import {
	CommentType,
	IComment,
	ICommentInput,
	ICommentWithCount,
} from './commentModel';

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

	updateCommentInReview = async (
		commentInput: ICommentInput,
		userId: string,
		commentId: string,
	): Promise<IComment> => {
		await this.validateCommentOwnership(commentId, userId);
		const comment = await commentDAO.updateInReview(commentInput, commentId);
		return comment;
	};

	async deleteCommentInReview(
		commentId: string,
		userId: string,
	): Promise<number> {
		await this.validateCommentOwnership(commentId, userId);
		const deletedComment = await commentDAO.deleteInReview(commentId);

		if (!deletedComment) {
			throw new HttpError('삭제할 댓글을 찾을 수 없습니다.', 404);
		}

		const targetReviewId = deletedComment.target.item.toString();
		const commentCount =
			await reviewService.decreaseCommentCount(targetReviewId);
		return commentCount;
	}

	async getCommentListInReview(reviewId: string): Promise<IComment[]> {
		const comments = await commentDAO.findAllByTargetItem(
			CommentType.REVIEW,
			reviewId,
		);

		return comments;
	}

	private async validateCommentOwnership(
		commentId: string,
		userId: string,
	): Promise<void> {
		const comment = await commentDAO.findById(commentId);

		if (!comment) {
			throw new HttpError('댓글을 찾을 수 없습니다.', 404);
		}

		if (comment.user.id.toString() !== userId) {
			throw new HttpError('댓글 작성자가 아닙니다.', 403);
		}
	}
}

export const commentService = new CommentService();
