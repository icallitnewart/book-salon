export const isUndefined = (value: unknown): value is undefined =>
	value === undefined;
export const isNumber = (value: unknown): value is number =>
	typeof value === 'number' && !Number.isNaN(value);
