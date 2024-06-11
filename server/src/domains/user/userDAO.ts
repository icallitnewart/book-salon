import { User, IUser, IUserModel } from './userModel';

class UserDAO {
	async create(userInput: IUser): Promise<IUserModel> {
		return User.create(userInput);
	}

	async findByEmail(email: string): Promise<IUserModel | null> {
		return User.findOne({ email });
	}

	async findById(userId: string): Promise<IUserModel | null> {
		return User.findOne({ _id: userId });
	}

	async updateUser(
		userId: string,
		userData: Partial<IUser>,
	): Promise<IUserModel | null> {
		return User.findByIdAndUpdate(userId, userData, { new: true });
	}
}

export const userDAO = new UserDAO();
