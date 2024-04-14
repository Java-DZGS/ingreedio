import { combineReducers } from '@reduxjs/toolkit';
import { auth } from './authReducer/auth.reducer';

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
