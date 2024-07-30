/* eslint-disable no-underscore-dangle */
import { IUserData } from './userData';

export const isValidUserData = (data?: IUserData): data is IUserData => {
	return typeof data?._id === 'string' && typeof data?.nickname === 'string';
};
