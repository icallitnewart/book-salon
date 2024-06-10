import { User, IUser, IUserModel } from './userModel';

class UserDAO {
	async create(userInput: IUser): Promise<IUserModel> {
		return User.create(userInput);
	}
}

export const userDAO = new UserDAO();
