import { Schema, model, Document, Types } from 'mongoose';

interface IUser {
	id: string | Types.ObjectId;
	nickname: string;
}

export interface IReviewInput {
	title: string;
	content: string;
	rating: number;
	tags: string[];
}

export interface IReviewInputWithUser extends IReviewInput {
	user: string;
}

export interface IReview extends IReviewInput {
	user: IUser;
	viewCount: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface IReviewModel extends IReview, Document {}

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         user:
 *           type: string
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         rating:
 *           type: number
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         viewCount:
 *           type: number
 *           minimum: 0
 *           default: 0
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         _id: 60a9a1c1f2d3b12f3c8d0f1e
 *         user: 60a9a1c1f2d3b12f3c8d0f1c
 *         title: 반전이 엄청난 추리소설 추천
 *         content: 읽는 내내 몰입하게 만드는 소설이었습니다.
 *         rating: 5
 *         tags: ['스릴러', '추리소설']
 *         viewCount: 120
 *         createdAt: '2023-05-20T15:30:00Z'
 *         updatedAt: '2023-05-20T15:30:00Z'
 *     ReviewInput:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - rating
 *       properties:
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *         tags:
 *           type: array
 *           items:
 *             type: string
 */
const reviewSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'Users',
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
			min: 1,
			max: 5,
		},
		tags: {
			type: [String],
			default: [],
		},
		viewCount: {
			type: Number,
			default: 0,
			minimum: 0,
		},
	},
	{ timestamps: true },
);

reviewSchema.index({ user: 1 });
reviewSchema.index({ createdAt: -1 });
reviewSchema.index({ viewCount: -1 });

export const Review = model<IReviewModel>('Reviews', reviewSchema);
