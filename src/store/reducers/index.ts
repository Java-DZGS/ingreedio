import { combineReducers } from '@reduxjs/toolkit';
import { auth } from './authReducer/auth.reducer';

export default combineReducers({
  auth,
});
