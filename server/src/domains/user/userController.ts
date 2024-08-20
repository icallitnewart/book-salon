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

	loginUser = async (req: Request, res: Response) => {
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
			user: this.formatUserResponse(user),
		});
	};

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

	getMyProfile = async (req: Request, res: Response) => {
		const { userId } = req;
		if (!userId) {
			throw new HttpError('인증에 실패하였습니다.', 401);
		}

		const user = await userService.findUserById(userId);

		res.json({
			result: 'success',
			user: this.formatUserResponse(user),
		});
	};

	getAuthInfo = async (req: Request, res: Response) => {
		const createResponse = (isAuth: boolean, user?: IUserModel) => ({
			result: 'success',
			isAuth,
			...(isAuth &&
				user && {
					user: this.formatUserResponse(user),
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
	};

	updateUser = async (req: Request, res: Response) => {
		const { userId } = req;
		if (!userId) {
			throw new HttpError('인증에 실패하였습니다.', 401);
		}

		const { currentPassword, ...userData } = req.body;
		const user = await userService.updateUser(
			userId,
			currentPassword,
			userData,
		);

		res.json({
			result: 'success',
			user: this.formatUserResponse(user),
		});
	};

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

	formatUserResponse(user: IUserModel) {
		const { id, email, nickname } = user;
		return {
			id,
			email,
			nickname,
		};
	}
}

export const userController = new UserController();
