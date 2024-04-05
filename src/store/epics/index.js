import { combineEpics, ofType } from 'redux-observable';
import { switchMap, catchError, map } from 'rxjs/operators';
import { from, of } from 'rxjs';
import actions from '../actions';
import types from '../types';
import services from '../../services';

const signInEpic = (action$, store) => action$.pipe(
  ofType(types.SIGN_IN_REQUEST),
  switchMap(({ payload: { username, password } }) => from(
    services.signInApi(username, password),
  ).pipe(
    map((response) => actions.signInSuccess(response.data)),
    catchError((error) => of(actions.signInFailure(error.message))),
  )),
);

const signUpEpic = (action$, store) => action$.pipe(
  ofType(types.SIGN_UP_REQUEST),
  switchMap(({
    payload: {
      userName, displayName, email, password,
    },
  }) => from(services.signUpApi(userName, displayName, email, password)).pipe(
    map((response) => actions.signInSuccess(response.data)),
    catchError((error) => of(actions.signInFailure(error.message))),
  )),
);

// Combine epics
export const rootEpic = combineEpics(signInEpic, signUpEpic);
