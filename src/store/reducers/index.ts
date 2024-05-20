import { combineReducers } from '@reduxjs/toolkit';
import auth from './auth.reducer';
import like from './like.reducer';
import user from './user.reducer';

const rootReducer = combineReducers({
  auth,
  like,
  user,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
