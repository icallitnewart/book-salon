import { createSlice } from '@reduxjs/toolkit';

import { IUserInfo } from './types/userTypes';
import { loginUser, registerUser, updateUser } from './apis/userApi';

interface IStatus {
	loading: boolean;
	error: string | null;
}

interface IUserState {
	isAuth: boolean;
	userInfo: IUserInfo | null;
	loginStatus: IStatus;
	registerStatus: IStatus;
	updateStatus: IStatus;
}

const initialState: IUserState = {
	isAuth: false,
	userInfo: null,
	loginStatus: {
		loading: false,
		error: null,
	},
	registerStatus: {
		loading: false,
		error: null,
	},
	updateStatus: {
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
		clearRegisterStatus(state) {
			state.registerStatus.error = null;
			state.registerStatus.loading = false;
		},
		clearUpdateStatus(state) {
			state.updateStatus.error = null;
			state.updateStatus.loading = false;
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
			state.userInfo = action.payload;
		});
		builder.addCase(loginUser.rejected, (state, action) => {
			state.loginStatus.loading = false;
			state.loginStatus.error =
				action.payload?.message ?? '알 수 없는 에러 발생';
		});
		builder.addCase(registerUser.pending, state => {
			state.registerStatus.loading = true;
			state.registerStatus.error = null;
		});
		builder.addCase(registerUser.fulfilled, state => {
			state.registerStatus.loading = false;
		});
		builder.addCase(registerUser.rejected, (state, action) => {
			state.registerStatus.loading = false;
			state.registerStatus.error =
				action.payload?.message ?? '알 수 없는 에러 발생';
		});
		builder.addCase(updateUser.pending, state => {
			state.updateStatus.loading = true;
			state.updateStatus.error = null;
		});
		builder.addCase(updateUser.fulfilled, (state, action) => {
			state.updateStatus.loading = false;
			state.userInfo = action.payload;
		});
		builder.addCase(updateUser.rejected, (state, action) => {
			state.updateStatus.loading = false;
			state.updateStatus.error =
				action.payload?.message ?? '알 수 없는 에러 발생';
		});
	},
});

export const { clearLoginStatus, clearRegisterStatus, clearUpdateStatus } =
	userSlice.actions;
export default userSlice.reducer;
