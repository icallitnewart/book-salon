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

	async update(
		userId: string,
		userData: Partial<IUser>,
	): Promise<IUserModel | null> {
		return User.findByIdAndUpdate(userId, userData, { new: true });
	}

	async delete(userId: string): Promise<void> {
		await User.findByIdAndDelete(userId);
	}
}

export const userDAO = new UserDAO();
