/* eslint-disable implicit-arrow-linebreak */
import { Epic, ofType, combineEpics } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import { AxiosError } from 'axios';
import { AnyAction } from 'redux';
import { RootState } from '../reducers';
import actions, { types } from '../actions';
import api from '../../config/api';

const getLikeApiUrl = (ingredientId: string): string =>
  `/ingredients/${ingredientId}/likes`;

const getDislikeApiUrl = (ingredientId: string): string =>
  `/ingredients/${ingredientId}/allergens`;

const likeIngredientEpic: Epic<AnyAction, AnyAction, RootState> = (
  action$,
  _state$,
) =>
  action$.pipe(
    ofType(types.LIKE_INGREDIENT),
    mergeMap(async (action) => {
      const ingredient = action.payload;

      try {
        // todo when ingredient ids are available
        await api.post(getLikeApiUrl(ingredient.id));
        return { type: types.LIKE_SUCCESS, payload: ingredient };
      } catch (error) {
        return { type: types.LIKE_FAILURE, payload: error as AxiosError };
      }
    }),
  );

const dislikeIngredientEpic: Epic<AnyAction, AnyAction, RootState> = (
  action$,
  _state$,
) =>
  action$.pipe(
    ofType(types.DISLIKE_INGREDIENT),
    mergeMap(async (action) => {
      const ingredient = action.payload;

      try {
        // todo when ingredient ids are available
        await api.post(getDislikeApiUrl(ingredient.id));
        return { type: types.DISLIKE_SUCCESS, payload: ingredient };
      } catch (error) {
        return { type: types.DISLIKE_FAILURE, payload: error as AxiosError };
      }
    }),
  );

const unlikeIngredientEpic: Epic<AnyAction, AnyAction, RootState> = (
  action$,
  _state$,
) =>
  action$.pipe(
    ofType(types.UNLIKE_INGREDIENT),
    mergeMap(async (action) => {
      const ingredient = action.payload;

      try {
        await api.delete(getLikeApiUrl(ingredient.id));
        return { type: types.UNLIKE_SUCCESS, payload: ingredient };
      } catch (error) {
        return { type: types.LIKE_FAILURE, payload: error as AxiosError };
      }
    }),
  );

const undislikeIngredientEpic: Epic<AnyAction, AnyAction, RootState> = (
  action$,
  _state$,
) =>
  action$.pipe(
    ofType(types.UNDISLIKE_INGREDIENT),
    mergeMap(async (action) => {
      const ingredient = action.payload;
      try {
        await api.delete(getDislikeApiUrl(ingredient.id));
        return { type: types.UNDISLIKE_SUCCESS, payload: ingredient };
      } catch (error) {
        return { type: types.DISLIKE_FAILURE, payload: error as AxiosError };
      }
    }),
  );

export const getLikedDislikedEpic: Epic<AnyAction, AnyAction, RootState> = (
  action$,
) =>
  action$.pipe(
    ofType(types.GET_USER_INFO_SUCCESS),
    mergeMap((action) => {
      const { likedIngredients, allergens } = action.payload;
      return [
        actions.getLikesSuccess(likedIngredients),
        actions.getDislikesSuccess(allergens),
      ];
    }),
  );

export const likeEpic = combineEpics(
  likeIngredientEpic,
  dislikeIngredientEpic,
  unlikeIngredientEpic,
  undislikeIngredientEpic,
  getLikedDislikedEpic,
);
