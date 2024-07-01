import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { mongo } from 'mongoose';

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
		} catch (error: unknown) {
			if (error instanceof mongo.MongoServerError && error.code === 11000) {
				throw new HttpError('이미 존재하는 이메일입니다.', 409, 'email');
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

	async findUserById(userId: string): Promise<IUserModel> {
		const user = await userDAO.findById(userId);
		if (!user) {
			throw new HttpError('사용자를 찾을 수 없습니다.', 404);
		}

		return user;
	}

	async updateUser(
		userId: string,
		currentPassword: string,
		userData: Partial<IUserInput>,
	): Promise<IUserModel> {
		try {
			const user = await userDAO.findById(userId);
			if (!user) {
				throw new HttpError('사용자를 찾을 수 없습니다.', 404);
			}

			// 현재 비밀번호 확인
			const isCurrentPasswordMatch = await bcrypt.compare(
				currentPassword,
				user.password,
			);
			if (!isCurrentPasswordMatch) {
				throw new HttpError(
					'현재 비밀번호가 올바르지 않습니다.',
					401,
					'currentPassword',
				);
			}

			const { email, nickname, password, passwordConfirm } = userData;
			const newUserData: Partial<IUser> = { nickname };

			// 이메일 변경시 업데이트
			if (email && email !== user.email) {
				newUserData.email = email;
			}

			// 새 비밀번호 유효성 검사 및 암호화
			if (password) {
				if (password !== passwordConfirm) {
					throw new HttpError(
						'새 비밀번호와 비밀번호 확인이 일치하지 않습니다.',
						400,
					);
				}

				const hashedPassword = await bcrypt.hash(password, 10);
				newUserData.password = hashedPassword;
			}

			const updatedUser = await userDAO.update(userId, newUserData);
			if (!updatedUser) {
				throw new HttpError('사용자 정보 업데이트에 실패하였습니다.', 500);
			}

			return updatedUser;
		} catch (error: unknown) {
			if (error instanceof mongo.MongoServerError && error.code === 11000) {
				throw new HttpError('이미 존재하는 이메일입니다.', 409, 'email');
			}

			throw error;
		}
	}

	async deleteUser(userId: string, password: string): Promise<void> {
		const user = await userDAO.findById(userId);
		if (!user) {
			throw new HttpError('사용자를 찾을 수 없습니다.', 404);
		}

		const isPasswordMatch = await bcrypt.compare(password, user.password);
		if (!isPasswordMatch) {
			throw new HttpError('비밀번호가 올바르지 않습니다.', 401, 'password');
		}

		await userDAO.delete(userId);
	}
}

export const userService = new UserService();
