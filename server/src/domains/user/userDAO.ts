import { User, IUser, IUserModel } from './userModel';

export class UserDAO {
	static async create(userInput: IUser): Promise<IUserModel> {
		return User.create(userInput);
	}
}
