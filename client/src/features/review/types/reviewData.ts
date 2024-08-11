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

export interface IReviewViewCount {
	viewCount: number;
}

export interface IReviewDetailData
	extends Omit<IReviewForm, 'id'>,
		IReviewViewCount {
	_id: string;
	user: IUserData;
	commentCount: number;
	createdAt: string;
	updatedAt: string;
}

export type IReviewDetail = Omit<IReviewDetailData, '_id'> & { id: string };

export type IReviewPreview = Pick<
	IReviewDetail,
	'id' | 'user' | 'title' | 'content' | 'createdAt' | 'viewCount'
>;

export interface IReviewList {
	reviews: IReviewDetail[];
	pageInfo: IPageInfo;
}
