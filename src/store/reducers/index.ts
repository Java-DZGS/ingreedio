import { combineReducers } from '@reduxjs/toolkit';
import { auth } from './auth.reducer';
import { like } from './like.reducer';

const rootReducer = combineReducers({
  auth,
  like,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
