import { IBookDetail } from '@features/book/types/bookData';
import { IUserData } from '@features/user/types/userData';
import { IPageInfo } from '@typeDefs/data';

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

export interface IReviewDetailData extends Omit<IReviewForm, 'id'> {
	_id: string;
	user: IUserData;
	viewCount: number;
	commentCount: number;
	createdAt: string;
	updatedAt: string;
}

export type IReviewDetail = Omit<IReviewDetailData, '_id'> & { id: string };

export type IReviewPreview = Pick<
	IReviewDetail,
	'id' | 'user' | 'title' | 'content' | 'createdAt'
>;

export interface IReviewList {
	reviews: IReviewDetail[];
	pageInfo: IPageInfo;
}
