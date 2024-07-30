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
};
