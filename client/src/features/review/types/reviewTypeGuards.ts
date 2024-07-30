import { typeGuards } from '@typeDefs/typeGuards';
import { isValidBookDetail } from '@features/book/types/bookTypeGuards';
import { isValidUserData } from '@features/user/types/userTypeGuards';
import { IReviewDetail, IReviewForm, IReviewInput } from './reviewData';

export const isValidReviewInput = (
	input?: IReviewInput,
): input is IReviewInput => {
	return (
		typeGuards.isObject(input) &&
		typeGuards.isString(input.title) &&
		typeGuards.isString(input.content) &&
		typeGuards.isArray(input.tags) &&
		input.tags.every(typeGuards.isString) &&
		typeGuards.isNumber(input.rating)
	);
};

export const isValidReviewForm = (form?: IReviewForm): form is IReviewForm => {
	return isValidReviewInput(form) && isValidBookDetail(form.book);
};

export const isValidReviewDetail = (
	detail?: IReviewDetail,
): detail is IReviewDetail => {
	return (
		isValidReviewForm(detail) &&
		isValidUserData(detail?.user) &&
		typeGuards.isString(detail.id) &&
		typeGuards.isNumber(detail.viewCount) &&
		typeGuards.isString(detail.createdAt) &&
		typeGuards.isString(detail.updatedAt)
	);
};
