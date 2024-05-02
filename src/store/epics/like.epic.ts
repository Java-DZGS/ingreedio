/* eslint-disable implicit-arrow-linebreak */
import { Epic, ofType, combineEpics } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import axios, { AxiosError } from 'axios';
import { AnyAction } from 'redux';
import { RootState } from '../reducers';
import { types } from '../actions';

const likeIngredientEpic: Epic<AnyAction, AnyAction, RootState> = (
  action$,
  _state$,
) =>
  action$.pipe(
    ofType(types.LIKE_INGREDIENT),
    mergeMap(async (action) => {
      const ingredient = action.payload;

      try {
        // todo when backend liking works
        // const apiUrl = 'LIKE_ENDPOINT';
        // await axios.post(apiUrl, { ingredient });
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
        // todo when backend liking works
        // const apiUrl = 'your_dislike_api_endpoint';
        // await axios.post(apiUrl, { ingredient });
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
        // todo when backend unliking works
        // const apiUrl = 'UNLIKE_ENDPOINT';
        // await axios.delete(apiUrl, { data: { ingredient } });
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
        // todo when backend undisliking works
        // const apiUrl = 'UNDISLIKE_ENDPOINT';
        // await axios.delete(apiUrl, { data: { ingredient } });
        return { type: types.UNDISLIKE_SUCCESS, payload: ingredient };
      } catch (error) {
        return { type: types.DISLIKE_FAILURE, payload: error as AxiosError };
      }
    }),
  );

export const likeEpic = combineEpics(
  likeIngredientEpic,
  dislikeIngredientEpic,
  unlikeIngredientEpic,
  undislikeIngredientEpic,
);
