import { isValidPageInfo, typeGuards } from '@typeDefs/typeGuards';
import { isValidBookDetail } from '@features/book/types/bookTypeGuards';
import { isValidUserData } from '@features/user/types/userTypeGuards';
import {
	IReviewDetail,
	IReviewForm,
	IReviewInput,
	IReviewList,
} from './reviewData';

export const isValidReviewInput = (input: unknown): input is IReviewInput => {
	return (
		typeGuards.isObject(input) &&
		typeGuards.hasKey<IReviewInput, 'book'>(input, 'book') &&
		typeGuards.isString(input.title) &&
		typeGuards.hasKey<IReviewInput, 'content'>(input, 'content') &&
		typeGuards.isString(input.content) &&
		typeGuards.hasKey<IReviewInput, 'tags'>(input, 'tags') &&
		typeGuards.isArray(input.tags) &&
		input.tags.every(typeGuards.isString) &&
		typeGuards.hasKey<IReviewInput, 'rating'>(input, 'rating') &&
		typeGuards.isNumber(input.rating)
	);
};

export const isValidReviewForm = (form: unknown): form is IReviewForm => {
	return (
		typeGuards.hasKey(form, 'book') &&
		isValidBookDetail(form.book) &&
		isValidReviewInput(form)
	);
};

export const isValidReviewDetail = (
	detail: unknown,
): detail is IReviewDetail => {
	return (
		isValidReviewForm(detail) &&
		typeGuards.hasKey<IReviewDetail, 'user'>(detail, 'user') &&
		isValidUserData(detail.user) &&
		typeGuards.hasKey<IReviewDetail, 'id'>(detail, 'id') &&
		typeGuards.isString(detail.id) &&
		typeGuards.hasKey<IReviewDetail, 'viewCount'>(detail, 'viewCount') &&
		typeGuards.isNumber(detail.viewCount) &&
		typeGuards.hasKey<IReviewDetail, 'createdAt'>(detail, 'createdAt') &&
		typeGuards.isString(detail.createdAt) &&
		typeGuards.hasKey<IReviewDetail, 'updatedAt'>(detail, 'updatedAt') &&
		typeGuards.isString(detail.updatedAt)
	);
};

export const isValidReviewList = (data: unknown): data is IReviewList => {
	return (
		typeGuards.isObject(data) &&
		typeGuards.hasKey<IReviewList, 'reviews'>(data, 'reviews') &&
		typeGuards.isArray(data.reviews) &&
		data.reviews.every(review => isValidReviewDetail(review)) &&
		typeGuards.hasKey<IReviewList, 'pageInfo'>(data, 'pageInfo') &&
		isValidPageInfo(data.pageInfo)
	);
};
