import { IReviewListOptions, SortTypes } from '@config/query/queryKeys';

export function createReviewListQuery(options: IReviewListOptions) {
	const query = {
		filters: options.filters ?? null,
		sort: options.sort ?? { type: SortTypes.LATEST },
		pagination: options.pagination ?? null,
	};

	return query;
}

export interface IQueryParams {
	[key: string]: string | number | boolean | undefined;
}

export function createQueryString(params: IQueryParams): string {
	return Object.entries(params)
		.filter(([_, value]) => value !== undefined)
		.map(([key, value]) => `${key}=${value}`)
		.join('&');
}
