export enum SearchOptionType {
	BOOK = 'BOOK',
	REVIEW = 'REVIEW',
}

export interface IPageInfo {
	lastPage: number;
	hasNextPage: boolean;
}

export interface IPageOptions {
	page?: number;
	perPage?: number;
	pageGroupSize?: number;
}

export enum ICommentType {
	REVIEW = 'Reviews',
}

export interface ICommentTarget {
	type: ICommentType;
	id: string;
}
