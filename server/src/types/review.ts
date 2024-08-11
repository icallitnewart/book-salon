export enum SortOption {
	MOST_VIEWED = 'mostViewed',
	LATEST = 'latest',
}

export interface IGetReviewListQuery {
	page?: string;
	perPage?: string;
	pageGroupSize?: string;
	sort?: SortOption;
	isbn?: string;
}

export interface IGetReviewsQuery {
	page?: number;
	perPage?: number;
	pageGroupSize?: number;
	sort?: SortOption;
}

export interface IGetReviewsByIsbnQuery extends IGetReviewsQuery {
	isbn: string;
}

export interface ISearchReviewsQuery {
	page?: string;
	perPage?: string;
	pageGroupSize?: string;
}

export interface ISearchReviewsParsedQuery {
	page?: number;
	perPage?: number;
	pageGroupSize?: number;
}

export interface ISearchReviews extends ISearchReviewsParsedQuery {
	searchTerm: string;
}
