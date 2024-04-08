import actions from '../../types';

const initialState = {
  loginSuccessful: null,
  signupSuccessful: null,
  accessToken: null,
  refreshToken: null,
  buttonLoading: false,
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case actions.SIGN_IN_REQUEST:
      return {
        ...state,
        buttonLoading: true,
      };

    case actions.SIGN_IN_SUCCESS:
      return {
        ...state,
        loginSuccessful: true,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        buttonLoading: false,
      };

    case actions.SIGN_IN_FAILURE:
      return {
        ...state,
        loginSuccessful: false,
        accessToken: null,
        refreshToken: null,
        buttonLoading: false,
      };

    case actions.SIGN_UP_REQUEST:
      return {
        ...state,
        buttonLoading: true,
      };

    case actions.SIGN_UP_SUCCESS:
      return {
        ...state,
        signupSuccessful: true,
        buttonLoading: false,
      };

    case actions.SIGN_UP_FAILURE:
      return {
        ...state,
        signupSuccessful: false,
        buttonLoading: false,
      };

    case actions.SIGN_OUT:
      return state;

    case actions.END_AUTH_ACTION:
      return {
        ...state,
        loginSuccessful: null,
        signupSuccessful: null,
      };

    default:
      return state;
  }
};
