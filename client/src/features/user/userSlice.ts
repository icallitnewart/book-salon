import { createSlice } from '@reduxjs/toolkit';

import { IUserInfo } from './types/userTypes';
import { loginUser } from './apis/loginApi';

interface IStatus {
	loading: boolean;
	error: string | null;
}

interface IUserState {
	isAuth: boolean;
	user: IUserInfo | null;
	loginStatus: IStatus;
}

const initialState: IUserState = {
	isAuth: false,
	user: null,
	loginStatus: {
		loading: false,
		error: null,
	},
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		clearLoginStatus(state) {
			state.loginStatus.error = null;
			state.loginStatus.loading = false;
		},
	},
	extraReducers: builder => {
		builder.addCase(loginUser.pending, state => {
			state.loginStatus.loading = true;
			state.loginStatus.error = null;
		});
		builder.addCase(loginUser.fulfilled, (state, action) => {
			state.loginStatus.loading = false;
			state.isAuth = true;
			state.user = action.payload;
		});
		builder.addCase(loginUser.rejected, (state, action) => {
			state.loginStatus.loading = false;
			state.loginStatus.error =
				action.payload?.message ?? '알 수 없는 에러 발생';
		});
	},
});

export const { clearLoginStatus } = userSlice.actions;
export default userSlice.reducer;
