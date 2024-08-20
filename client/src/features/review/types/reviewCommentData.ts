import { IUserData } from '@features/user/types/userData';
import { ICommentTarget } from '@typeDefs/data';

export interface IReviewCommentForm {
	content: string;
}

export interface IReviewComment extends IReviewCommentForm {
	id: string;
	target: ICommentTarget;
	user: IUserData;
	createdAt: string;
	updatedAt: string;
}

export interface IReviewCommentData extends Omit<IReviewComment, 'id'> {
	_id: string;
}

export interface IReviewCommentCount {
	commentCount: number;
}

export interface IReviewCommentWithCount extends IReviewCommentCount {
	comment: IReviewComment;
}
