import { combineReducers } from '@reduxjs/toolkit';

import sampleReducer from './sampleSlice';
import userReducer from '../features/user/userSlice';

const rooterReducer = combineReducers({
	sample: sampleReducer,
	user: userReducer,
});

export default rooterReducer;
