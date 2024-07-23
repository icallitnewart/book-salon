import { createSlice } from '@reduxjs/toolkit';

import { IUserInfo } from './types/userData';

import { updateUser, deleteUser } from './apis/userApi';

interface IStatus {
	loading: boolean | null;
	error: string | null;
}

interface IUserState {
	isAuth: boolean;
	userInfo: IUserInfo | null;
	updateStatus: IStatus;
	deleteStatus: IStatus;
}

const initialState: IUserState = {
	isAuth: false,
	userInfo: null,
	updateStatus: {
		loading: false,
		error: null,
	},
	deleteStatus: {
		loading: false,
		error: null,
	},
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateAuth(state, action) {
			state.isAuth = true;
			state.userInfo = action.payload;
		},
		clearUpdateStatus(state) {
			state.updateStatus.error = null;
			state.updateStatus.loading = false;
		},
		clearDeleteStatus(state) {
			state.deleteStatus.error = null;
			state.deleteStatus.loading = false;
		},
	},
	extraReducers: builder => {
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
		builder.addCase(deleteUser.pending, state => {
			state.deleteStatus.loading = true;
			state.deleteStatus.error = null;
		});
		builder.addCase(deleteUser.fulfilled, state => {
			state.deleteStatus.loading = false;
			state.isAuth = false;
			state.userInfo = null;
		});
		builder.addCase(deleteUser.rejected, (state, action) => {
			state.deleteStatus.loading = false;
			state.deleteStatus.error =
				action.payload?.message ?? '알 수 없는 에러 발생';
		});
	},
});

export const { updateAuth, clearUpdateStatus, clearDeleteStatus } =
	userSlice.actions;
export default userSlice.reducer;
