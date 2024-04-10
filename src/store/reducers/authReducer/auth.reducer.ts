import { AnyAction } from 'redux';
import { types } from '../../actions';

type State = {
  loginSuccessful: boolean | null,
  signupSuccessful: boolean | null,
  accessToken: string,
  refreshToken: string,
  buttonLoading: boolean,
}

const initialState: State = {
  loginSuccessful: null,
  signupSuccessful: null,
  accessToken: '',
  refreshToken: '',
  buttonLoading: false,
};

export const auth = (state: State = initialState, action: AnyAction)
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
