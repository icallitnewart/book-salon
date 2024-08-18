export interface IPageQuery {
	page?: string;
	perPage?: string;
	pageGroupSize?: string;
}

export interface IPageQueryParsed {
	page?: number;
	perPage?: number;
	pageGroupSize?: number;
}
