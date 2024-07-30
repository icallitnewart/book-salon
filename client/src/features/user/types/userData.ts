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

export interface IUserUpdate extends IUserRegister {
	currentPassword: string;
}

export interface IUserDelete {
	password: string;
}

export interface IUserAuth {
	isAuth: boolean;
	user?: IUserInfo;
}

export interface IUserData {
	id: string;
	nickname: string;
}
