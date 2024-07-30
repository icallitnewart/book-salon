/* eslint-disable no-underscore-dangle */
type WithId<T> = T extends { _id: string }
	? Omit<T, '_id'> & { id: string }
	: T;

export function convertObjectId<T extends Record<string, any>>(
	obj: T,
	nestedFields: string[] = [],
): WithId<T> {
	const convertId = (item: Record<string, any>): Record<string, any> => {
		if (typeof item !== 'object' || item === null) {
			return item;
		}

		const result = { ...item };
		if ('_id' in result) {
			result.id = result._id;
			delete result._id;
		}

		if (nestedFields && nestedFields.length) {
			nestedFields.forEach(field => {
				if (field in result && typeof result[field] === 'object') {
					result[field] = convertId(result[field]);
				}
			});
		}

		return result;
	};

	return convertId(obj) as WithId<T>;
}
