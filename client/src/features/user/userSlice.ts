import { createSlice } from '@reduxjs/toolkit';

import { IUserInfo } from './types/userData';

interface IUserState {
	isAuth: boolean;
	userInfo: IUserInfo | null;
}

const initialState: IUserState = {
	isAuth: false,
	userInfo: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateAuth(state, action) {
			state.isAuth = true;
			state.userInfo = action.payload;
		},
	},
});

export const { updateAuth } = userSlice.actions;
export default userSlice.reducer;
