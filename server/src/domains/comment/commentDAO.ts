import { Types } from 'mongoose';
import {
	Comment,
	ICommentInput,
	ICommentModel,
	ICommentWithType,
} from './commentModel';
import { HttpError } from '../../utils/HttpError';

class CommentDAO {
	createInReview = async (
		commentInput: ICommentWithType,
	): Promise<ICommentModel> => {
		const comment = await Comment.create(commentInput);
		const populatedComment = await this.populateCommentInReview(comment.id);

		if (!populatedComment) {
			throw new HttpError('댓글 생성 중 오류가 발생했습니다.', 500);
		}

		return populatedComment;
	};

	updateInReview = async (
		commentInput: ICommentInput,
		commentId: string,
	): Promise<ICommentModel> => {
		const comment = await Comment.findByIdAndUpdate(commentId, commentInput, {
			new: true,
			runValidators: true,
		});

		if (!comment) {
			throw new HttpError('댓글을 찾을 수 없습니다.', 404);
		}

		const populatedComment = await this.populateCommentInReview(comment.id);
		if (!populatedComment) {
			throw new HttpError('댓글 수정 중 오류가 발생했습니다.', 500);
		}

		return populatedComment;
	};

	async deleteInReview(commentId: string): Promise<ICommentModel | null> {
		return Comment.findByIdAndDelete(commentId);
	}

	async findById(commentId: string): Promise<ICommentModel | null> {
		return Comment.findById(commentId).populate('user', 'id nickname');
	}

	async populateCommentInReview(commentId: string): Promise<ICommentModel> {
		const [populatedComment] = await Comment.aggregate([
			{ $match: { _id: Types.ObjectId.createFromHexString(commentId) } },
			{
				$lookup: {
					from: 'users',
					localField: 'user',
					foreignField: '_id',
					as: 'user',
				},
			},
			{ $unwind: '$user' },
			{
				$lookup: {
					from: 'reviews',
					localField: 'target.item',
					foreignField: '_id',
					as: 'target.item',
				},
			},
			{ $unwind: '$target.item' },
			{
				$project: {
					_id: 1,
					content: 1,
					'user._id': 1,
					'user.nickname': 1,
					'target.type': 1,
					'target.item._id': 1,
					'target.item.title': 1,
					createdAt: 1,
					updatedAt: 1,
				},
			},
		]);

		return populatedComment;
	}
}

export const commentDAO = new CommentDAO();
