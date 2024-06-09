import { combineReducers } from '@reduxjs/toolkit';

import sampleReducer from './sampleSlice';

const rooterReducer = combineReducers({
	sample: sampleReducer,
});

export default rooterReducer;
