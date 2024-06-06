import { AxiosError } from 'axios';
import { AnyAction } from 'redux';
import { AuthResponse } from '../../services/auth.service';

export const types = {
  SIGN_IN_REQUEST: 'SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE: 'SIGN_IN_FAILURE',
  SIGN_UP_REQUEST: 'SIGN_UP_REQUEST',
  SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
  SIGN_UP_FAILURE: 'SIGN_UP_FAILURE',
  LOG_USER: 'LOG_USER',
  SIGN_OUT: 'SIGN_OUT',
  END_AUTH_ACTION: 'END_AUTH_ACTION',
};

const signInRequest = (username: string, password: string): AnyAction => ({
  type: types.SIGN_IN_REQUEST,
  payload: { username, password },
});

const signInSuccess = (response: AuthResponse): AnyAction => ({
  type: types.SIGN_IN_SUCCESS,
  payload: response,
});

// todo: error type // i think this is resolved
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

const logUser = (accessToken: string, username: string): AnyAction => ({
  type: types.LOG_USER,
  payload: { accessToken, username },
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
  logUser,
};
