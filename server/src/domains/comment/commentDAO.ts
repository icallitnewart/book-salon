import { Types } from 'mongoose';
import { Comment, ICommentModel, ICommentWithType } from './commentModel';
import { HttpError } from '../../utils/HttpError';

class CommentDAO {
	async createInReview(commentInput: ICommentWithType): Promise<ICommentModel> {
		const comment = await Comment.create(commentInput);
		const [populatedComment] = await Comment.aggregate([
			{ $match: { _id: Types.ObjectId.createFromHexString(comment.id) } },
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

		if (!populatedComment) {
			throw new HttpError('댓글 생성 중 오류가 발생했습니다.', 500);
		}

		return populatedComment;
	}
}

export const commentDAO = new CommentDAO();
