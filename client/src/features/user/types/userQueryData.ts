import { IUserInfo } from './userData';

export interface IAuthQueryData {
	isAuth: boolean;
	user?: IUserInfo;
}
