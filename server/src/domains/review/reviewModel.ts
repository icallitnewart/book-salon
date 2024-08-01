import { Schema, model, Document, Types } from 'mongoose';

interface IUser {
	id: string | Types.ObjectId;
	nickname: string;
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

export interface IReviewInput {
	title: string;
	content: string;
	rating: number;
	tags: string[];
	book: IBook;
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
 *         book:
 *           type: object
 *           properties:
 *             isbn:
 *               type: string
 *             title:
 *               type: string
 *             author:
 *               type: string
 *             description:
 *               type: string
 *             category:
 *               type: string
 *             cover:
 *               type: string
 *             publisher:
 *               type: string
 *             pubDate:
 *               type: string
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
 *     ReviewInput:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - rating
 *         - book
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
 *         book:
 *           type: object
 *           properties:
 *             isbn:
 *               type: string
 *             title:
 *               type: string
 *             author:
 *               type: string
 *             description:
 *               type: string
 *             category:
 *               type: string
 *             cover:
 *               type: string
 *             publisher:
 *               type: string
 *             pubDate:
 *               type: string
 *       example:
 *         title: 반전이 엄청난 추리소설 추천
 *         content: 읽는 내내 몰입하게 만드는 소설이었습니다.
 *         rating: 5
 *         tags: ['스릴러', '추리소설']
 *         book:
 *           isbn: '9788954699272'
 *           title: '셜록 홈즈: 바스커빌의 개'
 *           author: '아서 코난 도일'
 *           description: '셜록 홈즈 시리즈 중 가장 유명한 장편소설'
 *           category: '추리소설'
 *           cover: 'https://example.com/cover.jpg'
 *           publisher: '민음사'
 *           pubDate: '2020-01-01'
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
		book: {
			isbn: {
				type: String,
				required: true,
			},
			title: {
				type: String,
				required: true,
			},
			author: {
				type: String,
				required: true,
			},
			description: {
				type: String,
				required: true,
			},
			category: {
				type: String,
				required: true,
			},
			cover: {
				type: String,
				required: true,
			},
			publisher: {
				type: String,
				required: true,
			},
			pubDate: {
				type: String,
				required: true,
			},
		},
	},
	{ timestamps: true },
);

reviewSchema.index({ user: 1 });
reviewSchema.index({ createdAt: -1, _id: -1 });
reviewSchema.index({ viewCount: -1, _id: -1 });

export const Review = model<IReviewModel>('Reviews', reviewSchema);
