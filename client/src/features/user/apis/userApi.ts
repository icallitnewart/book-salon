import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
	IUserAuth,
	IUserInfo,
	IUserLogin,
	IUserRegister,
	IUserUpdate,
} from '../types/userTypes';
import { APIS } from '../../../constants/apis';

interface IErrorResponse {
	status: number;
	message: string;
	field?: string;
}

export const loginUser = createAsyncThunk<
	IUserInfo, // fulfilled
	IUserLogin, // action.payload
	{ rejectValue: IErrorResponse } // rejected
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
	{ rejectValue: IErrorResponse } // rejected
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

export const updateUser = createAsyncThunk<
	IUserInfo, // fulfilled
	IUserUpdate, // action.payload
	{ rejectValue: IErrorResponse } // rejected
>('user/update', async (credentials: IUserUpdate, { rejectWithValue }) => {
	try {
		const response = await axios.patch(APIS.USER.UPDATE, credentials, {
			withCredentials: true,
		});

		return response.data.user;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			const { status, data } = error.response;
			const response: IErrorResponse = {
				status,
				message: data.message,
			};
			if (data.field) response.field = data.field;

			return rejectWithValue(response);
		}
		return rejectWithValue({ status: 500, message: '네트워크 에러 발생' });
	}
});

export const deleteUser = createAsyncThunk<
	null, // fulfilled
	string, // action.payload
	{ rejectValue: IErrorResponse } // rejected
>('user/delete', async (password, { rejectWithValue }) => {
	try {
		await axios.delete(APIS.USER.DELETE, {
			data: { password },
			withCredentials: true,
		});
		return null;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			const { status, data } = error.response;
			const response: IErrorResponse = {
				status,
				message: data.message,
			};
			if (data.field) response.field = data.field;

			return rejectWithValue(response);
		}
		return rejectWithValue({ status: 500, message: '네트워크 에러 발생' });
	}
});

export const logoutUser = createAsyncThunk<
	null, // fulfilled
	void, // action.payload
	{ rejectValue: IErrorResponse } // rejected
>('user/logout', async (_, { rejectWithValue }) => {
	try {
		await axios.post(APIS.USER.LOGOUT, null, { withCredentials: true });
		return null;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			const { status, data } = error.response;
			return rejectWithValue({ status, message: data.message });
		}
		return rejectWithValue({ status: 500, message: '네트워크 에러 발생' });
	}
});

export const getAuthUser = createAsyncThunk<
	IUserAuth, // fulfilled
	void, // action.payload
	{ rejectValue: IErrorResponse } // rejected
>('user/auth', async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get(APIS.USER.AUTH, {
			withCredentials: true,
		});
		const { isAuth, user } = response.data;

		return {
			isAuth,
			...(user && { user }),
		};
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			const { status, data } = error.response;
			return rejectWithValue({ status, message: data.message });
		}
		return rejectWithValue({ status: 500, message: '네트워크 에러 발생' });
	}
});
