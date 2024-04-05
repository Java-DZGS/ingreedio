import actions from '../../types';

const initialState = {
  loginSuccessful: null,
  accessToken: null,
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case actions.SIGN_IN_REQUEST:
      return state;

    case actions.SIGN_UP_REQUEST:
      return state;

    case actions.SIGN_IN_SUCCESS:
      return {
        ...state,
        loginSuccessful: true,
        accessToken: action.payload.accessToken,
      };

    case actions.SIGN_IN_FAILURE:
      return {
        ...state,
        loginSuccessful: false,
      };

    default:
      return state;
  }
};
