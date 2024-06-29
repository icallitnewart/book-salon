const validator = {
	// 이메일 형식 검사
	hasValidEmail: (email: string): boolean => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	},
	// 빈 값 검사
	hasValue: (value: string): boolean => {
		return value.trim().length > 0;
	},
	// 공백 검사
	hasWhitespace: (value: string): boolean => {
		return /\s/.test(value);
	},
	// 특수문자 검사
	hasSpecialCharacter: (value: string): boolean => {
		const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
		return specialCharRegex.test(value);
	},
	// 숫자 검사
	hasNumber: (value: string): boolean => {
		const numberRegex = /\d/;
		return numberRegex.test(value);
	},
	// 길이 검사
	hasValidLength: (
		value: string,
		minLength: number,
		maxLength: number,
	): boolean => {
		return value.length >= minLength && value.length <= maxLength;
	},
	// 동일한 값 검사
	hasEqualValue: (value1: string, value2: string): boolean => {
		return value1 === value2;
	},
	// 영문자 검사
	hasAlphabet: (value: string): boolean => {
		const alphabetRegex = /[a-zA-Z]/;
		return alphabetRegex.test(value);
	},
};

const validatorWithError = {
	// 이메일 형식 검사
	forbidInvalidEmail: (email: string): string => {
		const errMsg = '유효한 이메일 주소를 입력해주세요.';
		return validator.hasValidEmail(email) ? '' : errMsg;
	},
	// 빈 값 금지
	requireValue: (value: string): string => {
		const errMsg = '필수 입력 항목입니다.';
		return validator.hasValue(value) ? '' : errMsg;
	},
	// 공백 금지
	forbidWhitespace: (value: string): string => {
		const errMsg = '공백 문자는 허용되지 않습니다.';
		return !validator.hasWhitespace(value) ? '' : errMsg;
	},
	// 특수문자 금지
	forbidSpecialCharacter: (value: string): string => {
		const errMsg = '특수 문자는 허용되지 않습니다.';
		return !validator.hasSpecialCharacter(value) ? '' : errMsg;
	},
	// 특수문자 필수
	requireSpecialCharacter: (value: string): string => {
		const errMsg = '특수 문자를 1자 이상 포함해주세요.';
		return validator.hasSpecialCharacter(value) ? '' : errMsg;
	},
	// 숫자 금지
	forbidNumber: (value: string): string => {
		const errMsg = '숫자는 허용되지 않습니다.';
		return !validator.hasNumber(value) ? '' : errMsg;
	},
	// 숫자 필수
	requireNumber: (value: string): string => {
		const errMsg = '숫자를 1자 이상 포함해주세요.';
		return validator.hasNumber(value) ? '' : errMsg;
	},
	// 길이 제한
	limitLength: (
		value: string,
		minLength: number,
		maxLength: number,
	): string => {
		const errMsg = `${minLength}자에서 ${maxLength}자 사이로 입력해주세요.`;
		return validator.hasValidLength(value, minLength, maxLength) ? '' : errMsg;
	},
	// 비밀번호 일치 검사
	forbidNotEqualPassword: (
		passwordConfirm: string,
		password: string,
	): string => {
		const errMsg = '비밀번호가 일치하지 않습니다.';
		return validator.hasEqualValue(passwordConfirm, password) ? '' : errMsg;
	},
	// 영문자 필수
	requireAlphabet: (value: string): string => {
		const errMsg = '영문자를 1자 이상 포함해주세요.';
		return validator.hasAlphabet(value) ? '' : errMsg;
	},
};

export const validateEmail = (email: string): string => {
	return (
		validatorWithError.requireValue(email) ||
		validatorWithError.forbidWhitespace(email) ||
		validatorWithError.forbidInvalidEmail(email)
	);
};

export const validatePassword = (
	password: string,
	isRequired = true,
): string => {
	if (!isRequired) return '';
	return (
		validatorWithError.requireValue(password) ||
		validatorWithError.limitLength(password, 8, 16) ||
		validatorWithError.forbidWhitespace(password) ||
		validatorWithError.requireSpecialCharacter(password) ||
		validatorWithError.requireAlphabet(password) ||
		validatorWithError.requireNumber(password)
	);
};

export const validateLoginPassword = (password: string): string => {
	return validatorWithError.requireValue(password);
};

export const validatePasswordConfirm = (
	passwordConfirm: string,
	password: string,
	isRequired = true,
): string => {
	return (
		(isRequired && validatorWithError.requireValue(passwordConfirm)) ||
		validatorWithError.forbidNotEqualPassword(passwordConfirm, password)
	);
};

export const validateVerifyPassword = (password: string) => {
	return validatorWithError.requireValue(password);
};

export const validateNickname = (nickname: string): string => {
	return (
		validatorWithError.requireValue(nickname) ||
		validatorWithError.forbidWhitespace(nickname) ||
		validatorWithError.forbidSpecialCharacter(nickname) ||
		validatorWithError.limitLength(nickname, 2, 6)
	);
};
