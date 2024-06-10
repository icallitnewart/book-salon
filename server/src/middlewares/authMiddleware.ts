import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { HttpError } from '../utils/HttpError';

const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const request = req;
	const token = request.cookies?.token;

	if (!token) {
		next(new HttpError('로그인이 필요한 서비스입니다.', 401));
		return;
	}

	try {
		const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

		if (!userId) {
			next(new HttpError('인증에 실패하였습니다.', 401));
			return;
		}

		request.userId = userId;
		next();
	} catch (error) {
		next(new HttpError('인증에 실패하였습니다.', 401));
	}
};

export default authMiddleware;
