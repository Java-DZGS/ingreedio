import types from '../types';

const signInRequest = (username, password) => ({
  type: types.SIGN_IN_REQUEST,
  payload: { username, password },
});

const signInSuccess = (token) => ({
  type: types.SIGN_IN_SUCCESS,
  payload: token,
});

const signInFailure = (error) => ({
  type: types.SIGN_IN_FAILURE,
  payload: error,
});

const signUpRequest = (userName, displayName, email, password) => ({
  type: types.SIGN_UP_REQUEST,
  payload: {
    userName, displayName, email, password,
  },
});

const signUpSuccess = () => ({
  type: types.SIGN_UP_SUCCESS,
});

const signUpFailure = () => ({
  type: types.SIGN_UP_SUCCESS,
});

const signOut = () => ({
  type: types.SIGN_OUT,
});

const endAuthAction = () => ({
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
