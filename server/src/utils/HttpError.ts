export class HttpError extends Error {
	statusCode: number;

	constructor(message: string, statusCode: number = 400) {
		super(message);
		this.statusCode = statusCode;

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}
