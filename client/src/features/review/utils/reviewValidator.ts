import { validatorWithError } from '@utils/validator';

import { IBookDetail, isValidBookDetail } from '@features/book/types/bookData';
import { REVIEW_MAX_LEN } from '../constants/limits';

export const validateReviewTitle = (title: string): string => {
	return (
		validatorWithError.requireValue(title, '제목') ||
		validatorWithError.limitLength(title, 1, REVIEW_MAX_LEN.TITLE)
	);
};

export const validateReviewTags = (tags: string[]): string => {
	const validateTag = (value: string) =>
		validatorWithError.limitLength(value, 1, REVIEW_MAX_LEN.TAG_INPUT);
	const errorTag = tags.find(tag => validateTag(tag));

	return validateTag(errorTag || tags[0]);
};

export const validateReviewContent = (content: string): string => {
	return validatorWithError.requireValue(content, '리뷰 내용');
};

export const validateReviewRating = (rating: number): string => {
	return (
		validatorWithError.requireValue(rating.toString(), '평점') ||
		validatorWithError.limitRange(rating, 0.5, 5)
	);
};

export const validateReviewBook = (bookData?: IBookDetail): string => {
	return (
		validatorWithError.require(bookData, '도서 정보') ||
		validatorWithError.forbidInvalidObjectType(
			bookData,
			'도서 정보',
			isValidBookDetail,
		)
	);
};
