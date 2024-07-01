import { Request, Response } from 'express';
import { IUserInput, IUserModel } from './userModel';
import { userService } from './userService';
import { HttpError } from '../../utils/HttpError';

class UserController {
	async registerUser(req: Request, res: Response) {
		const userInput = req.body as IUserInput;
		await userService.registerUser(userInput);

		res.status(201).json({
			result: 'success',
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
			user: {
				email: user.email,
				nickname: user.nickname,
			},
		});
	}

	async logoutUser(req: Request, res: Response) {
		res.clearCookie('token', {
			httpOnly: true,
			secure: false, // TODO: 추후 true로 변경
			sameSite: 'strict',
		});

		res.json({
			result: 'success',
		});
	}

	async getMyProfile(req: Request, res: Response) {
		const { userId } = req;
		if (!userId) {
			throw new HttpError('인증에 실패하였습니다.', 401);
		}

		const { email, nickname } = await userService.findUserById(userId);

		res.json({
			result: 'success',
			user: {
				email,
				nickname,
			},
		});
	}

	async getAuthInfo(req: Request, res: Response) {
		const createResponse = (isAuth: boolean, user?: IUserModel) => ({
			result: 'success',
			isAuth,
			...(isAuth &&
				user && {
					email: user.email,
					nickname: user.nickname,
				}),
		});

		const { userId } = req;
		if (!userId) {
			res.json(createResponse(false));
			return;
		}

		const user = await userService.findUserById(userId);
		if (!user) {
			res.json(createResponse(false));
			return;
		}

		res.json(createResponse(true, user));
	}

	async updateUser(req: Request, res: Response) {
		const { userId } = req;
		if (!userId) {
			throw new HttpError('인증에 실패하였습니다.', 401);
		}

		const { currentPassword, ...userData } = req.body;
		const { email, nickname } = await userService.updateUser(
			userId,
			currentPassword,
			userData,
		);

		res.json({
			result: 'success',
			user: {
				email,
				nickname,
			},
		});
	}

	deleteUser = async (req: Request, res: Response) => {
		const { userId } = req;
		const { password } = req.body;

		if (!userId) {
			throw new HttpError('인증에 실패하였습니다.', 401);
		}

		await userService.deleteUser(userId, password);
		await this.logoutUser(req, res);

		res.json({
			result: 'success',
		});
	};
}

export const userController = new UserController();
