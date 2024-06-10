import { Request, Response } from 'express';
import { IUserInput } from './userModel';
import { userService } from './userService';

class UserController {
	async registerUser(req: Request, res: Response) {
		const userInput = req.body as IUserInput;
		const newUser = await userService.registerUser(userInput);

		res.status(201).json({
			result: 'success',
			user: newUser,
		});
	}
}

export const userController = new UserController();
