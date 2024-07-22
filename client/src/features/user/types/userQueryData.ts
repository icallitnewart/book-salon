interface IAuthUserData {
	email: string;
	nickname: string;
}

export interface IAuthQueryData {
	isAuth: boolean;
	user: IAuthUserData;
}
