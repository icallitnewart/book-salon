import { IPageOptions } from '@typeDefs/data';

interface IFilterOptions {
	isbn?: string;
}

export enum SortTypes {
	LATEST = 'latest',
	MOST_VIEWED = 'mostViewed',
}

interface ISortOptions {
	type: SortTypes;
}

export interface IReviewListOptions {
	filters?: IFilterOptions;
	sort?: ISortOptions;
	pagination?: IPageOptions;
}

export const userKeys = {
	all: ['users'] as const,
	login: ['users', 'login'] as const,
	register: ['users', 'register'] as const,
	update: ['users', 'update'] as const,
	delete: ['users', 'delete'] as const,
	logout: ['users', 'logout'] as const,
	auth: ['auth'] as const,
};

export const bookKeys = {
	all: ['books'] as const,
	bestseller: ['books', 'bestseller'] as const,
	detail: (isbn?: string) => ['books', 'detail', isbn] as const,
	search: (searchTerm?: string) => ['books', 'search', searchTerm] as const,
};

export const reviewKeys = {
	all: ['reviews'] as const,
	add: ['reviews', 'add'] as const,
	detail: (reviewId?: string) => ['reviews', 'detail', reviewId] as const,
	update: (reviewId?: string) => ['reviews', 'update', reviewId] as const,
	updateViewCount: (reviewId?: string) =>
		['reviews', 'updateViewCount', reviewId] as const,
	delete: (reviewId?: string) => ['reviews', 'delete', reviewId] as const,
	list: ({ filters, sort, pagination }: IReviewListOptions) => {
		const options = {
			filters: filters ?? null,
			sort: sort ?? { type: SortTypes.LATEST },
			page: pagination?.page ?? 1,
		};

		return ['reviews', 'list', options] as const;
	},
	search: (searchTerm?: string) => ['reviews', 'search', searchTerm] as const,
	addComment: (reviewId?: string) =>
		['reviews', 'comments', 'add', reviewId] as const,
	updateComment: (commentId?: string) =>
		['reviews', 'comments', 'update', commentId] as const,
	deleteComment: (commentId?: string) =>
		['reviews', 'comments', 'delete', commentId] as const,
	commentList: (reviewId?: string) =>
		['reviews', 'comments', 'list', reviewId] as const,
};
