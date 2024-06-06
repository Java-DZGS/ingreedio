import { AxiosError } from 'axios';
import { AnyAction } from 'redux';
import { IngredientObject } from '../../services/ingredients.service';

export const types = {
  LIKE_INGREDIENT: 'LIKE_INGREDIENT',
  DISLIKE_INGREDIENT: 'DISLIKE_INGREDIENT',
  LIKE_SUCCESS: 'LIKE_SUCCESS',
  DISLIKE_SUCCESS: 'DISLIKE_SUCCESS',
  LIKE_FAILURE: 'LIKE_FAILURE',
  DISLIKE_FAILURE: 'DISLIKE_FAILURE',
  UNLIKE_INGREDIENT: 'UNLIKE_INGREDIENT',
  UNDISLIKE_INGREDIENT: 'UNDISLIKE_INGREDIENT',
  UNLIKE_SUCCESS: 'UNLIKE_SUCCESS',
  UNDISLIKE_SUCCESS: 'UNDISLIKE_SUCCESS',
  GET_LIKES: 'GET_LIKES',
  GET_DISLIKES: 'GET_DISLIKES',
};

export const likeIngredient = (ingredient: IngredientObject): AnyAction => ({
  type: types.LIKE_INGREDIENT,
  payload: ingredient,
});

export const dislikeIngredient = (ingredient: IngredientObject): AnyAction => ({
  type: types.DISLIKE_INGREDIENT,
  payload: ingredient,
});

export const likeSuccess = (ingredient: IngredientObject): AnyAction => ({
  type: types.LIKE_SUCCESS,
  payload: ingredient,
});

export const dislikeSuccess = (ingredient: IngredientObject): AnyAction => ({
  type: types.DISLIKE_SUCCESS,
  payload: ingredient,
});

export const likeFailure = (error: AxiosError): AnyAction => ({
  type: types.LIKE_FAILURE,
  payload: error,
});

export const dislikeFailure = (error: AxiosError): AnyAction => ({
  type: types.DISLIKE_FAILURE,
  payload: error,
});

export const unlikeIngredient = (ingredient: IngredientObject): AnyAction => ({
  type: types.UNLIKE_INGREDIENT,
  payload: ingredient,
});

export const undislikeIngredient = (ingredient: IngredientObject): AnyAction => ({
  type: types.UNDISLIKE_INGREDIENT,
  payload: ingredient,
});

export const unlikeSuccess = (ingredient: IngredientObject): AnyAction => ({
  type: types.UNLIKE_SUCCESS,
  payload: ingredient,
});

export const undislikeSuccess = (ingredient: IngredientObject): AnyAction => ({
  type: types.UNDISLIKE_SUCCESS,
  payload: ingredient,
});

export const getLikesSuccess = (likedIngredients: string[]): AnyAction => ({
  type: types.GET_LIKES,
  payload: likedIngredients,
});

export const getDislikesSuccess = (
  dislikedIngredients: string[],
): AnyAction => ({
  type: types.GET_DISLIKES,
  payload: dislikedIngredients,
});

export default {
  likeIngredient,
  dislikeIngredient,
  likeSuccess,
  dislikeSuccess,
  unlikeIngredient,
  undislikeIngredient,
  unlikeSuccess,
  undislikeSuccess,
  getLikesSuccess,
  getDislikesSuccess,
};
