import { AnyAction } from 'redux';
import { types } from '../actions';

type AuthState = {
  loginSuccessful: boolean | null;
  signupSuccessful: boolean | null;
  accessToken: string;
  refreshToken: string;
  buttonLoading: boolean;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  loginSuccessful: null,
  signupSuccessful: null,
  accessToken: '',
  refreshToken: '',
  buttonLoading: false,
  isAuthenticated: false,
};

const auth = (
  state: AuthState = initialState,
  action: AnyAction,
): typeof initialState => {
  switch (action.type) {
    case types.LOG_USER:
      return {
        ...state,
        accessToken: action.payload,
        isAuthenticated: true,
      };

    case types.SIGN_IN_REQUEST:
      return {
        ...state,
        buttonLoading: true,
      };

    case types.SIGN_IN_SUCCESS:
      return {
        ...state,
        loginSuccessful: true,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        buttonLoading: false,
        isAuthenticated: true,
      };

    case types.SIGN_IN_FAILURE:
      return {
        ...state,
        loginSuccessful: false,
        accessToken: '',
        refreshToken: '',
        buttonLoading: false,
        isAuthenticated: false,
      };

    case types.SIGN_UP_REQUEST:
      return {
        ...state,
        buttonLoading: true,
      };

    case types.SIGN_UP_SUCCESS:
      return {
        ...state,
        signupSuccessful: true,
        buttonLoading: false,
      };

    case types.SIGN_UP_FAILURE:
      return {
        ...state,
        signupSuccessful: false,
        buttonLoading: false,
      };

    case types.SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
      };

    case types.END_AUTH_ACTION:
      return {
        ...state,
        loginSuccessful: null,
        signupSuccessful: null,
      };

    default:
      return state;
  }
};

export default auth;
