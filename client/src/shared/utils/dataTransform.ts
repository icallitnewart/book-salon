/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
interface IWithMongoDBId {
	_id: string;
	[key: string]: any;
}

export const convertObjectId = <T extends IWithMongoDBId>(
	obj: T,
): Omit<T, '_id'> & { id: string } => {
	const { _id, ...rest } = obj;
	return {
		...rest,
		id: _id,
	};
};
