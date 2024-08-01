export enum OrderQuery {
	MostViewed = 'mostViewed',
	Latest = 'latest',
}

export interface IGetReviewListQuery {
	page?: string;
	limit?: string;
	maxPages?: string;
	order?: OrderQuery;
}
