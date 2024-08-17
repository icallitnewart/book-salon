import { IPageInfo } from './data';

export const typeGuards = {
	isString: (value: unknown): value is string => typeof value === 'string',
	isNumber: (value: unknown): value is number => typeof value === 'number',
	isObject: (value: unknown): value is object =>
		typeof value === 'object' && value !== null,
	isArray: (value: unknown): value is unknown[] => Array.isArray(value),
	isBoolean: (value: unknown): value is boolean => typeof value === 'boolean',
	isFunction: (value: unknown): value is (...args: unknown[]) => unknown =>
		typeof value === 'function',
	isUndefined: (value: unknown): value is undefined =>
		typeof value === 'undefined',
	isNull: (value: unknown): value is null => value === null,
	hasKey<Obj extends object, K extends string>(
		obj: unknown,
		key: K,
	): obj is Obj & Record<K, unknown> {
		return typeGuards.isObject(obj) && key in obj;
	},
	isStringArray: (value: string | string[]): value is string[] =>
		Array.isArray(value),
};

export const isValidPageInfo = (pageInfo: unknown): pageInfo is IPageInfo => {
	return (
		typeGuards.hasKey<IPageInfo, 'lastPage'>(pageInfo, 'lastPage') &&
		typeGuards.isNumber(pageInfo.lastPage) &&
		typeGuards.hasKey<IPageInfo, 'hasNextPage'>(pageInfo, 'hasNextPage') &&
		typeGuards.isBoolean(pageInfo.hasNextPage)
	);
};
