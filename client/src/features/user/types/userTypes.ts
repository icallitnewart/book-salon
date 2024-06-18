export interface IUserInfo {
	email: string;
	nickname: string;
}

export interface IUserLogin {
	email: string;
	password: string;
}

export interface IUserRegister {
	email: string;
	nickname: string;
	password: string;
	passwordConfirm: string;
}
