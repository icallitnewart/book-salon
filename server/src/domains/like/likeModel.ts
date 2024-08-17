import { model, Schema, Types } from 'mongoose';

export enum LikeType {
	BOOK = 'Books',
}

export interface IBook {
	isbn: string;
	title: string;
	author: string;
	description: string;
	category: string;
	cover: string;
	publisher: string;
	pubDate: string;
}

interface IUser {
	id: string | Types.ObjectId;
	nickname: string;
}

interface ITarget {
	type: LikeType;
	item: string | Types.ObjectId;
	extraData: IBook | null;
}

export interface ILike {
	user: IUser;
	target: ITarget;
	createdAt: Date;
	updatedAt: Date;
}

export interface ILikeModel extends ILike, Document {
	_id: Types.ObjectId;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Like:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             nickname:
 *               type: string
 *         target:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *               enum: [Books]
 *             item:
 *               type: string
 *             extraData:
 *               type: object
 *               description: 추가 데이터 (타입에 따라 다름)
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
const likeSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		target: {
			type: {
				type: String,
				enum: Object.values(LikeType),
				required: true,
			},
			item: {
				type: Schema.Types.Mixed,
				refPath(this: { target: { type: LikeType } }): string | null {
					return this.target.type === LikeType.BOOK ? null : 'target.type';
				},
				required: true,
			},
			extraData: {
				type: Schema.Types.Mixed,
				default: null,
			},
		},
	},
	{ timestamps: true },
);

likeSchema.index({ user: 1 });
likeSchema.index({ 'target.type': 1, 'target.item': 1 });
likeSchema.index({ createdAt: -1 });

export const Like = model<ILikeModel>('Likes', likeSchema);
