import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { HttpError } from '../utils/HttpError';

const errorMiddleware = (
	error: Error | HttpError,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const handleError = (
		statusCode: number,
		message: string = 'Unknown error',
	) => {
		logger.error(error.message);
		if (error.stack) logger.error(error.stack);

		res.status(statusCode).json({
			result: 'error',
			message,
		});
	};

	// 커스텀 에러 적용 (예외 처리 적용됨)
	if (error instanceof HttpError) {
		handleError(error.statusCode, error.message);
		return;
	}

	// 예상치 못한 에러
	handleError(500);
};

export default errorMiddleware;
