import { commentDAO } from './commentDAO';
import { CommentType, IComment, ICommentInput } from './commentModel';

class CommentService {
	async createCommentInReview(
		commentInput: ICommentInput,
		userId: string,
		reviewId: string,
	): Promise<IComment> {
		const comment = await commentDAO.createInReview({
			...commentInput,
			user: userId,
			target: {
				type: CommentType.REVIEW,
				item: reviewId,
			},
		});

		// TODO: 리뷰의 댓글 수 증가 로직 추가

		return comment;
	}
}

export const commentService = new CommentService();
