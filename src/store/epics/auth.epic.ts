/* eslint-disable max-len */
import { StateObservable, combineEpics, ofType } from 'redux-observable';
import { switchMap, catchError } from 'rxjs/operators';
import { from, of, Observable } from 'rxjs';
import { AnyAction } from 'redux';
import actions, { types } from '../actions';
import services from '../../services';
import { RootState } from '../reducers';

const signInEpic = (
  action$: Observable<AnyAction>,
  _state$: StateObservable<RootState>,
) => action$.pipe(
  ofType(types.SIGN_IN_REQUEST),
  switchMap(({ payload: { username, password } }) => from(services.signInApi(username, password)).pipe(
    switchMap((response) => [
      actions.signInSuccess(response.data),
      actions.getUserInfoRequest(username),
      actions.setUsername(username),
    ]),
    catchError((error) => of(actions.signInFailure(error.message))),
  )),
);

const signUpEpic = (
  action$: Observable<AnyAction>,
  _state$: StateObservable<RootState>,
) => action$.pipe(
  ofType(types.SIGN_UP_REQUEST),
  switchMap(({
    payload: {
      username, displayName, email, password,
    },
  }) => from(services.signUpApi(username, displayName, email, password)).pipe(
    switchMap((_response) => [
      actions.signUpSuccess(),
      actions.getUserInfoRequest(username),
      actions.setUsername(username),
    ]),
    catchError((error) => of(actions.signUpFailure(error.message))),
  )),
);

const signOutEpic = (
  action$: Observable<AnyAction>,
  _state$: StateObservable<RootState>,
) => action$.pipe(
  ofType(types.SIGN_OUT),
  switchMap(() => of(actions.clearUserData())),
);

// Combine epics
export const authEpic = combineEpics(signInEpic, signUpEpic, signOutEpic);
