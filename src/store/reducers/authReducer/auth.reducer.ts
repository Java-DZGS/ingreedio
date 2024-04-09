import { AnyAction } from 'redux';
import { types } from '../../actions';

const initialState = {
  loginSuccessful: null as boolean | null,
  signupSuccessful: null as boolean | null,
  accessToken: '' as string,
  refreshToken: '' as string,
  buttonLoading: false as boolean,
};

export const auth = (state: typeof initialState = initialState, action: AnyAction)
  : typeof initialState => {
  switch (action.type) {
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
      };

    case types.SIGN_IN_FAILURE:
      return {
        ...state,
        loginSuccessful: false,
        accessToken: '',
        refreshToken: '',
        buttonLoading: false,
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
      return state;

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
