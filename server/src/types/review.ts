export enum OrderQuery {
	MostViewed = 'mostViewed',
	Latest = 'latest',
}

export interface IGetReviewListQuery {
	page?: string;
	perPage?: string;
	pageGroupSize?: string;
	order?: OrderQuery;
}
