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
