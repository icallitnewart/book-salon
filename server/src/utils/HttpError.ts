export class HttpError extends Error {
	statusCode: number;

	field?: string;

	constructor(message: string, statusCode: number = 400, field?: string) {
		super(message);
		this.statusCode = statusCode;
		this.field = field;

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}
