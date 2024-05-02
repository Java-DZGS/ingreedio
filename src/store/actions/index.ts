import { AnyAction } from 'redux';
import { AxiosError } from 'axios';
import { AuthResponse } from '../../services/auth.service';

export const types = {
  SIGN_IN_REQUEST: 'SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE: 'SIGN_IN_FAILURE',
  SIGN_UP_REQUEST: 'SIGN_UP_REQUEST',
  SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
  SIGN_UP_FAILURE: 'SIGN_UP_FAILURE',
  SIGN_OUT: 'SIGN_OUT',
  END_AUTH_ACTION: 'END_AUTH_ACTION',
  LIKE_INGREDIENT: 'LIKE_INGREDIENT',
  DISLIKE_INGREDIENT: 'DISLIKE_INGREDIENT',
  LIKE_SUCCESS: 'LIKE_SUCCESS',
  DISLIKE_SUCCESS: 'DISLIKE_SUCCESS',
  LIKE_FAILURE: 'LIKE_FAILURE',
  DISLIKE_FAILURE: 'DISLIKE_FAILURE',
  UNLIKE_INGREDIENT: 'UNLIKE_INGREDIENT',
  UNDISLIKE_INGREDIENT: 'UNDISLIKE_INGREDIENT',
  UNLIKE_SUCCESS: 'UNLIKE_SUCCESS',
  UNDISLIKE_SUCCESS: 'UNDISLIKE_SUCCESS',
  CLEAR_USER_DATA: 'CLEAR_USER_DATA',
  NO_OP: 'NO_OP' ,
};

export const likeIngredient = (ingredient: string): AnyAction => ({
  type: types.LIKE_INGREDIENT,
  payload: ingredient,
});

export const dislikeIngredient = (ingredient: string): AnyAction => ({
  type: types.DISLIKE_INGREDIENT,
  payload: ingredient,
});

export const likeSuccess = (ingredient: string): AnyAction => ({
  type: types.LIKE_SUCCESS,
  payload: ingredient,
});

export const dislikeSuccess = (ingredient: string): AnyAction => ({
  type: types.DISLIKE_SUCCESS,
  payload: ingredient,
});

export const likeFailure = (error: AxiosError): AnyAction => ({
  type: types.LIKE_FAILURE,
  payload: error,
});

export const dislikeFailure = (error: AxiosError): AnyAction => ({
  type: types.DISLIKE_FAILURE,
  payload: error,
});

export const unlikeIngredient = (ingredient: string): AnyAction => ({
  type: types.UNLIKE_INGREDIENT,
  payload: ingredient,
});

export const undislikeIngredient = (ingredient: string): AnyAction => ({
  type: types.UNDISLIKE_INGREDIENT,
  payload: ingredient,
});

export const unlikeSuccess = (ingredient: string): AnyAction => ({
  type: types.UNLIKE_SUCCESS,
  payload: ingredient,
});

export const undislikeSuccess = (ingredient: string): AnyAction => ({
  type: types.UNDISLIKE_SUCCESS,
  payload: ingredient,
});

export const clearUserData = (): AnyAction => ({
  type: types.CLEAR_USER_DATA,
});

const signInRequest = (username: string, password: string): AnyAction => ({
  type: types.SIGN_IN_REQUEST,
  payload: { username, password },
});

const signInSuccess = (response: AuthResponse): AnyAction => ({
  type: types.SIGN_IN_SUCCESS,
  payload: response,
});

// todo: error type
const signInFailure = (error: AxiosError): AnyAction => ({
  type: types.SIGN_IN_FAILURE,
  payload: error,
});

const signUpRequest = (
  username: string,
  displayName: string,
  email: string,
  password: string,
): AnyAction => ({
  type: types.SIGN_UP_REQUEST,
  payload: {
    username,
    displayName,
    email,
    password,
  },
});

const signUpSuccess = (): AnyAction => ({
  type: types.SIGN_UP_SUCCESS,
});

const signUpFailure = (error: AxiosError): AnyAction => ({
  type: types.SIGN_UP_FAILURE,
  payload: error,
});

const signOut = (): AnyAction => ({
  type: types.SIGN_OUT,
});

const endAuthAction = (): AnyAction => ({
  type: types.END_AUTH_ACTION,
});

export default {
  signInRequest,
  signInSuccess,
  signInFailure,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  signOut,
  endAuthAction,
  likeIngredient,
  dislikeIngredient,
  likeSuccess,
  dislikeSuccess,
  unlikeIngredient,
  undislikeIngredient,
  unlikeSuccess,
  undislikeSuccess,
  clearUserData,
};
