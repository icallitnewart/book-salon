import { validatorWithError } from '@utils/validator';

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
