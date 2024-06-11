import { createSlice } from '@reduxjs/toolkit';

import { IUserInfo } from './types/userTypes';

interface IUserState {
	isAuth: boolean;
	user: IUserInfo | null;
	loading: boolean;
	error: string | null;
}

const initialState: IUserState = {
	isAuth: false,
	user: null,
	loading: false,
	error: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: builder => {},
});

// export const {  } = userSlice.actions;
export default userSlice.reducer;
