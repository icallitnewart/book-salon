import { IPageQueryParsed } from './common';

export interface IGetLikedBooks extends IPageQueryParsed {
	userId: string;
}
