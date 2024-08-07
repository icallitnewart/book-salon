import { IUserData } from '@features/user/types/userData';
import { ICommentTarget } from '@typeDefs/data';

export interface IReviewComment {
	id: string;
	target: ICommentTarget;
	user: IUserData;
	content: string;
	createdAt: string;
	updatedAt: string;
}

export interface IReviewCommentData extends Omit<IReviewComment, 'id'> {
	_id: string;
}
