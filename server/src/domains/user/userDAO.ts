import { User, IUser, IUserModel } from './userModel';

class UserDAO {
	async create(userInput: IUser): Promise<IUserModel> {
		return User.create(userInput);
	}

	async findByEmail(email: string): Promise<IUserModel | null> {
		return User.findOne({ email });
	}
}

export const userDAO = new UserDAO();
