import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { IUserInfo, IUserLogin } from '../types/userTypes';
import { USER_API_URL } from '../../../constants/url';

interface ErrorResponse {
	status: number;
	message: string;
}

export const loginUser = createAsyncThunk<
	IUserInfo, // fulfilled
	IUserLogin, // action.payload
	{ rejectValue: ErrorResponse } // rejected
>('auth/login', async (credentials: IUserLogin, { rejectWithValue }) => {
	try {
		const response = await axios.post(`${USER_API_URL}/login`, credentials, {
			withCredentials: true,
		});

		return response.data.user;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			const { status, data } = error.response;
			return rejectWithValue({ status, message: data.message });
		}
		return rejectWithValue({ status: 500, message: '네트워크 에러 발생' });
	}
});
