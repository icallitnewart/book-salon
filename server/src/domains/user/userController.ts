import { Request, Response } from 'express';
import { IUserInput } from './userModel';
import { UserService } from './userService';

export class UserController {
	static async registerUser(req: Request, res: Response) {
		const userInput = req.body as IUserInput;
		const newUser = await UserService.registerUser(userInput);

		res.status(201).json({
			result: 'success',
			user: newUser,
		});
	}
}
