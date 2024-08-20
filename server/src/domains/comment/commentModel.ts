import { Schema, model, Document, Types } from 'mongoose';

export enum CommentType {
	REVIEW = 'Reviews',
}

interface IUser {
	id: string | Types.ObjectId;
	nickname: string;
}

interface ITarget {
	type: CommentType;
	item: string | Types.ObjectId;
}

export interface ICommentInput {
	content: string;
}

export interface ICommentInputWithUser extends ICommentInput {
	user: string;
}

export interface ICommentWithType extends ICommentInputWithUser {
	target: ITarget;
}

export interface IComment extends Omit<ICommentWithType, 'user'> {
	user: IUser;
	createdAt: Date;
	updatedAt: Date;
}

export interface ICommentWithCount {
	comment: IComment;
	commentCount: number;
}

export interface ICommentModel extends IComment, Document {
	_id: Types.ObjectId;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         user:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             nickname:
 *               type: string
 *         target:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *               enum: [Reviews]
 *             item:
 *               type: string
 *         content:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     CommentInput:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         content:
 *           type: string
 *       example:
 *         content: 정말 좋은 리뷰네요. 저도 이 책을 읽어봐야겠어요!
 */
const commentSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'Users',
			required: true,
		},
		target: {
			type: {
				type: String,
				enum: Object.values(CommentType),
				required: true,
			},
			item: {
				type: Schema.Types.ObjectId,
				refPath: 'target.type',
				required: true,
			},
		},
		content: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

commentSchema.index({ user: 1 });
commentSchema.index({ 'target.type': 1, 'target.item': 1 });
commentSchema.index({ createdAt: -1 });

export const Comment = model<ICommentModel>('Comments', commentSchema);
