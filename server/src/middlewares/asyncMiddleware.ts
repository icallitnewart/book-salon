import { Request, Response, NextFunction } from 'express';

const asyncMiddleware = (
	action: (req: Request, res: Response) => Promise<void>,
) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await action(req, res);
		} catch (err) {
			next(err);
		}
	};
};

export default asyncMiddleware;
