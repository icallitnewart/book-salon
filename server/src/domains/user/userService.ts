import bcrypt from 'bcrypt';

import { IUser, IUserInput, IUserModel } from './userModel';
import { userDAO } from './userDAO';
import { HttpError } from '../../utils/HttpError';

class UserService {
	async registerUser(userInput: IUserInput): Promise<IUserModel> {
		if (userInput.password !== userInput.passwordConfirm) {
			throw new HttpError('비밀번호가 일치하지 않습니다.', 400);
		}

		try {
			const hashedPassword = await bcrypt.hash(userInput.password, 10);
			const userInfo: IUser = {
				email: userInput.email,
				nickname: userInput.nickname,
				password: hashedPassword,
			};

			const newUser = await userDAO.create(userInfo);
			return newUser;

			// TODO: type 수정 필요
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if (error.errorResponse && error.code === 11000) {
				throw new HttpError('이미 존재하는 이메일입니다.', 409);
			}
			throw error;
		}
	}
}

export const userService = new UserService();
