import { combineReducers } from '@reduxjs/toolkit';
import { auth } from './authReducer/auth.reducer';
import { product } from './productReducer/product.reducer';

const rootReducer = combineReducers({
  auth,
  product
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
