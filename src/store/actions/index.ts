import { AnyAction } from 'redux';
import { AxiosError } from 'axios';
import { AuthResponse } from '../../services/authService/auth.service';

export const types = {
  SIGN_IN_REQUEST: 'SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE: 'SIGN_IN_FAILURE',
  SIGN_UP_REQUEST: 'SIGN_UP_REQUEST',
  SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
  SIGN_UP_FAILURE: 'SIGN_UP_FAILURE',
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

// todo: error type
const signInFailure = (error: AxiosError): AnyAction => ({
  type: types.SIGN_IN_FAILURE,
  payload: error,
});

const signUpRequest = (
  userName: string,
  displayName: string,
  email: string,
  password: string,
)
  : AnyAction => ({
  type: types.SIGN_UP_REQUEST,
  payload: {
    userName, displayName, email, password,
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
};
