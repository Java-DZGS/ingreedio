import { AnyAction } from 'redux';
import { types } from '../actions';
import { IngredientObject } from '../../services/ingredients.service';

type LikeState = {
  likedIngredients: IngredientObject[];
  dislikedIngredients: IngredientObject[];
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
          (ingredient) => ingredient.id !== (action.payload.id as string),
        ),
      };
    case types.UNDISLIKE_SUCCESS:
      return {
        ...state,
        dislikedIngredients: state.dislikedIngredients.filter(
          (ingredient) => ingredient.id !== (action.payload.id as string),
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
