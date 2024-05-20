import { AxiosError } from 'axios';
import { AnyAction } from 'redux';
import { UserInfoResponse } from '../../services/user.service';

export const types = {
  CLEAR_USER_DATA: 'CLEAR_USER_DATA',
  GET_USER_INFO_REQUEST: 'GET_USER_INFO_REQUEST',
  GET_USER_INFO_SUCCESS: 'GET_USER_INFO_SUCCESS',
  GET_USER_INFO_FAILURE: 'GET_USER_INFO_FAILURE',
  SET_USERNAME: 'SET_USERNAME',
};

export const clearUserData = (): AnyAction => ({
  type: types.CLEAR_USER_DATA,
});

export const getUserInfoRequest = (username: string): AnyAction => ({
  type: types.GET_USER_INFO_REQUEST,
  payload: { username },
});

export const getUserInfoSuccess = (data: UserInfoResponse): AnyAction => ({
  type: types.GET_USER_INFO_SUCCESS,
  payload: data,
});

export const getUserInfoFailure = (error: AxiosError): AnyAction => ({
  type: types.GET_USER_INFO_FAILURE,
  payload: error,
});

export const setUsername = (username: string): AnyAction => ({
  type: types.SET_USERNAME,
  payload: username,
});

export default {
  clearUserData,
  getUserInfoRequest,
  getUserInfoSuccess,
  getUserInfoFailure,
  setUsername,
};
