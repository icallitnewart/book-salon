import { nanoid } from 'nanoid';

import { typeGuards } from '@typeDefs/typeGuards';
import { IReviewDetail, IReviewTags } from '../types/reviewData';
import { isValidReviewDetail } from '../types/reviewTypeGuards';
import { REVIEW_MAX_LEN } from '../constants/limits';

export const generateTagInputPlaceholder = (isDisabled: boolean) => {
	if (isDisabled) {
		return `태그는 최대 ${REVIEW_MAX_LEN.TAGS}개까지 추가 가능합니다`;
	}

	return `태그를 입력해주세요 (${REVIEW_MAX_LEN.TAG_INPUT}자 이하, 최대 ${REVIEW_MAX_LEN.TAGS}개)`;
};

export const generateTagInputAriaLabel = (isDisabled: boolean) => {
	if (isDisabled) {
		return `태그 입력 최대 ${REVIEW_MAX_LEN.TAGS}개 도달`;
	}

	return `태그 입력 (${REVIEW_MAX_LEN.TAG_INPUT}자 이하, 최대 ${REVIEW_MAX_LEN.TAGS}개)`;
};

export const addIdsToTags = (tags: string[]): IReviewTags => {
	return tags.map(tag => ({ id: nanoid(), text: tag }));
};

export const removeIdsFromTags = (tags: IReviewTags): string[] => {
	return tags.map(tag => tag.text);
};

export const getReviewId = (result: string | IReviewDetail): string => {
	if (typeGuards.isString(result)) {
		return result;
	}

	if (isValidReviewDetail(result)) {
		return result.id;
	}

	throw new Error('Invalid review type');
};
