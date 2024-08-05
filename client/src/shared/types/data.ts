export interface IPageInfo {
	lastPage: number;
	hasNextPage: boolean;
}

export interface IPageOptions {
	page?: number;
	perPage?: number;
	pageGroupSize?: number;
}
