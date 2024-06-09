import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SampleState {
	test: string;
}

const initialState: SampleState = {
	test: 'test sample',
};

const sampleSlice = createSlice({
	name: 'sample',
	initialState,
	reducers: {
		setTest: (state, action: PayloadAction<string>) => {
			state.test = action.payload;
		},
	},
});

export const { setTest } = sampleSlice.actions;

export default sampleSlice.reducer;
