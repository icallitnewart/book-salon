import { IUserModel } from './src/domains/user/userModel';

declare global {
	namespace Express {
		interface Request {
			userId?: string;
		}
	}
}
