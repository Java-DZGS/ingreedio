import { AnyAction } from 'redux';
import { types } from '../actions';

type LikeState = {
  likedIngredients: string[];
  dislikedIngredients: string[];
};
const initialState: LikeState = {
  likedIngredients: [],
  dislikedIngredients: [],
};

const like = (
  state: LikeState = initialState,
  action: AnyAction,
): typeof initialState => {
  switch (action.type) {
    case types.LIKE_SUCCESS:
      return {
        ...state,
        likedIngredients: [...state.likedIngredients, action.payload],
      };
    case types.DISLIKE_SUCCESS:
      return {
        ...state,
        dislikedIngredients: [...state.dislikedIngredients, action.payload],
      };
    case types.UNLIKE_SUCCESS:
      return {
        ...state,
        likedIngredients: state.likedIngredients.filter(
          (ingredient) => ingredient !== (action.payload as string),
        ),
      };
    case types.UNDISLIKE_SUCCESS:
      return {
        ...state,
        dislikedIngredients: state.dislikedIngredients.filter(
          (ingredient) => ingredient !== (action.payload as string),
        ),
      };
    case types.GET_LIKES:
      return {
        ...state,
        likedIngredients: [...state.likedIngredients, ...action.payload],
      };
    case types.GET_DISLIKES:
      return {
        ...state,
        dislikedIngredients: [...state.dislikedIngredients, ...action.payload],
      };
    case types.CLEAR_USER_DATA:
      return initialState;
    default:
      return state;
  }
};

export default like;
