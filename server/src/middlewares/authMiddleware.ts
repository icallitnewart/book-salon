import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';

import { HttpError } from '../utils/HttpError';

const authMiddleware =
	(isRequired: boolean = true): RequestHandler =>
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const request = req;
		const token = request.cookies?.token;

		if (!token) {
			if (isRequired) {
				return next(
					new HttpError('로그인이 필요한 서비스입니다.', 401, 'auth'),
				);
			}

			return next();
		}

		try {
			const { userId } = jwt.verify(
				token,
				process.env.JWT_SECRET!,
			) as JwtPayload;

			if (!userId) {
				return next(new HttpError('유효하지 않은 토큰입니다.', 401, 'auth'));
			}

			request.userId = userId;
			return next();
		} catch (error) {
			if (error instanceof TokenExpiredError) {
				if (isRequired) {
					return next(
						new HttpError(
							'인증이 만료되었습니다. 다시 로그인해 주세요.',
							401,
							'auth',
						),
					);
				}

				return next();
			}

			return next(new HttpError('인증에 실패하였습니다.', 401, 'auth'));
		}
	};

export default authMiddleware;
