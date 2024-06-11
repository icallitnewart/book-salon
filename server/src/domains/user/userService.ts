import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

	async loginUser(
		email: string,
		password: string,
	): Promise<{ user: IUserModel; token: string }> {
		const user = await userDAO.findByEmail(email);
		if (!user) {
			throw new HttpError('이메일 혹은 비밀번호가 일치하지 않습니다.', 401);
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw new HttpError('이메일 혹은 비밀번호가 일치하지 않습니다.', 401);
		}

		const token = this.generateToken(user);
		return { user, token };
	}

	generateToken(user: IUserModel): string {
		return jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
			expiresIn: '1h',
		});
	}

	async getAuthenticatedUser(userId: string): Promise<IUserModel> {
		const user = await userDAO.findById(userId);
		if (!user) {
			throw new HttpError('사용자를 찾을 수 없습니다.', 404);
		}

		return user;
	}

	async updateUser(
		userId: string,
		userData: Partial<IUserInput>,
	): Promise<IUserModel> {
		const { email, nickname, password, passwordConfirm } = userData;
		if (password && password !== passwordConfirm) {
			throw new HttpError('비밀번호가 일치하지 않습니다.', 400);
		}

		const newUserData: Partial<IUser> = {
			email,
			nickname,
		};

		try {
			if (password) {
				const hashedPassword = await bcrypt.hash(password, 10);
				newUserData.password = hashedPassword;
			}

			const updatedUser = await userDAO.updateUser(userId, newUserData);
			if (!updatedUser) {
				throw new HttpError('사용자를 찾을 수 없습니다.', 404);
			}

			return updatedUser;

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
