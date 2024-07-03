import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
	IUserAuth,
	IUserInfo,
	IUserLogin,
	IUserRegister,
	IUserUpdate,
} from '../types/userData';
import { IErrorResponse } from '../../../shared/types/apiError';
import { APIS } from '../../../constants/apis';

import { authAxios } from '../../../shared/apis/authAxios';
import { handleApiError } from '../../../shared/utils/errorHandler';

export const loginUser = createAsyncThunk<
	IUserInfo, // fulfilled
	IUserLogin, // action.payload
	{ rejectValue: IErrorResponse } // rejected
>('user/login', async (credentials: IUserLogin, { rejectWithValue }) => {
	try {
		const response = await authAxios.post(APIS.USER.LOGIN, credentials);

		return response.data.user;
	} catch (error) {
		return rejectWithValue(handleApiError(error));
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
		return rejectWithValue(handleApiError(error));
	}
});

export const updateUser = createAsyncThunk<
	IUserInfo, // fulfilled
	IUserUpdate, // action.payload
	{ rejectValue: IErrorResponse } // rejected
>('user/update', async (credentials: IUserUpdate, { rejectWithValue }) => {
	try {
		const response = await authAxios.patch(APIS.USER.UPDATE, credentials);

		return response.data.user;
	} catch (error) {
		return rejectWithValue(handleApiError(error));
	}
});

export const deleteUser = createAsyncThunk<
	null, // fulfilled
	string, // action.payload
	{ rejectValue: IErrorResponse } // rejected
>('user/delete', async (password, { rejectWithValue }) => {
	try {
		await authAxios.delete(APIS.USER.DELETE, {
			data: { password },
		});
		return null;
	} catch (error) {
		return rejectWithValue(handleApiError(error));
	}
});

export const logoutUser = createAsyncThunk<
	null, // fulfilled
	void, // action.payload
	{ rejectValue: IErrorResponse } // rejected
>('user/logout', async (_, { rejectWithValue }) => {
	try {
		await authAxios.post(APIS.USER.LOGOUT, null);
		return null;
	} catch (error) {
		return rejectWithValue(handleApiError(error));
	}
});

export const getAuthUser = createAsyncThunk<
	IUserAuth, // fulfilled
	void, // action.payload
	{ rejectValue: IErrorResponse } // rejected
>('user/auth', async (_, { rejectWithValue }) => {
	try {
		const response = await authAxios.get(APIS.USER.AUTH);
		const { isAuth, user } = response.data;

		return {
			isAuth,
			...(user && { user }),
		};
	} catch (error) {
		return rejectWithValue(handleApiError(error));
	}
});
