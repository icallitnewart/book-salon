import { Request, Response } from 'express';
import { IUserInput } from './userModel';
import { userService } from './userService';
import { HttpError } from '../../utils/HttpError';

class UserController {
	async registerUser(req: Request, res: Response) {
		const userInput = req.body as IUserInput;
		const newUser = await userService.registerUser(userInput);

		res.status(201).json({
			result: 'success',
			user: newUser,
		});
	}

	async loginUser(req: Request, res: Response) {
		const { email, password } = req.body;
		const { user, token } = await userService.loginUser(email, password);

		res.cookie('token', token, {
			httpOnly: true,
			secure: false, // TODO: 추후 true로 변경
			sameSite: 'strict',
			maxAge: 3600000, // 1시간 (60분 * 60초 * 1000밀리초)
		});

		res.json({
			result: 'success',
			user,
		});
	}

	async updateUser(req: Request, res: Response) {
		const { userId } = req;
		if (!userId) {
			throw new HttpError('인증에 실패하였습니다.', 401);
		}

		const userData = req.body;
		const updatedUser = await userService.updateUser(userId, userData);
		const { password, ...userWithoutPassword } = updatedUser;

		res.json({
			result: 'success',
			user: userWithoutPassword,
		});
	}
}

export const userController = new UserController();
