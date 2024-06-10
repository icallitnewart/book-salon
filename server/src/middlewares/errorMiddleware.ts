import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { HttpError } from '../utils/HttpError';

const errorMiddleware = (
	error: Error | HttpError,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const logError = () => {
		logger.error(error.message);
		if (error.stack) logger.error(error.stack);
	};

	const handleError = (statusCode: number, errorMessage?: string) => {
		logError();

		let message = errorMessage;
		if (!message) {
			switch (statusCode) {
				case 400:
					message = '잘못된 요청입니다.';
					break;
				case 401:
					message = '인증이 필요합니다.';
					break;
				case 403:
					message = '권한이 없습니다.';
					break;
				case 404:
					message = '리소스를 찾을 수 없습니다.';
					break;
				case 409:
					message = '충돌이 발생했습니다.';
					break;
				default:
					message = '서버에서 오류가 발생했습니다.';
					break;
			}
		}

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
