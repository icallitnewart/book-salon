import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { IUserInfo, IUserLogin, IUserRegister } from '../types/userTypes';
import { APIS } from '../../../constants/apis';

interface ErrorResponse {
	status: number;
	message: string;
}

export const loginUser = createAsyncThunk<
	IUserInfo, // fulfilled
	IUserLogin, // action.payload
	{ rejectValue: ErrorResponse } // rejected
>('user/login', async (credentials: IUserLogin, { rejectWithValue }) => {
	try {
		const response = await axios.post(APIS.USER.LOGIN, credentials, {
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

export const registerUser = createAsyncThunk<
	IUserInfo, // fulfilled
	IUserRegister, // action.payload
	{ rejectValue: ErrorResponse } // rejected
>('user/register', async (credentials: IUserRegister, { rejectWithValue }) => {
	try {
		const response = await axios.post(APIS.USER.REGISTER, credentials);

		return response.data.user;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			const { status, data } = error.response;
			return rejectWithValue({ status, message: data.message });
		}
		return rejectWithValue({ status: 500, message: '네트워크 에러 발생' });
	}
});
