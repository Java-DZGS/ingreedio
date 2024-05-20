import { AnyAction } from 'redux';
import { types } from '../actions';

interface UserState {
  id: number;
  email: string;
  username: string;
  displayName: string;
  allergens: Array<{ id: number; name: string }>;
  likedProducts: number[];
  reviews: Array<{
    id: number;
    user: string;
    productId: number;
    rating: number;
    content: string;
    createdAt: string;
  }>;
}

const initialState: UserState = {
  id: 0,
  email: '',
  username: '',
  displayName: '',
  allergens: [],
  likedProducts: [],
  reviews: [],
};

const userReducer = (state = initialState, action: AnyAction): UserState => {
  switch (action.type) {
    case types.SET_USERNAME:
      return { ...state, username: action.payload };
    case types.GET_USER_INFO_SUCCESS:
      return { ...state, ...action.payload };
    case types.GET_USER_INFO_FAILURE:
      return { ...state };
    case types.CLEAR_USER_DATA:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
