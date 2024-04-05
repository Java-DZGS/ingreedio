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

const signUpRequest = (username, displayname, email, password) => ({
  type: types.SIGN_UP_REQUEST,
  payload: {
    username, displayname, email, password,
  },
});

export default {
  signInRequest,
  signInSuccess,
  signInFailure,
  signUpRequest,
};
