import { IBookDetail } from '@features/book/types/bookData';

export interface IReviewTag {
	id: string;
	text: string;
}

export type IReviewTags = IReviewTag[];

export interface IReviewInput {
	title: string;
	content: string;
	tags: string[];
	rating: number;
}

export interface IReviewForm extends IReviewInput {
	book: IBookDetail;
}

export interface IReviewDetail extends IReviewForm {
	id: number;
	nickname: string;
	viewCount: number;
	createdAt: string;
	updatedAt: string;
}

export type IReviewPreview = Pick<
	IReviewDetail,
	'id' | 'nickname' | 'title' | 'content' | 'createdAt'
>;
