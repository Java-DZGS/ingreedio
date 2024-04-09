import { StateObservable, combineEpics, ofType } from 'redux-observable';
import { switchMap, catchError, map } from 'rxjs/operators';
import { from, of, Observable } from 'rxjs';
import { AnyAction } from 'redux';
import actions, { types } from '../actions';
import services from '../../services';
import { RootState } from '../reducers';

const signInEpic = (
  action$: Observable<AnyAction>,
  state$: StateObservable<RootState>,
) => action$.pipe(
  ofType(types.SIGN_IN_REQUEST),
  switchMap(({ payload }) => from(
    services.signInApi(payload.username, payload.password),
  ).pipe(
    map((response) => actions.signInSuccess(response.data)),
    catchError((error) => {
      console.log(error);
      return of(actions.signInFailure(error.message));
    }),
  )),
);

const signUpEpic = (
  action$: Observable<AnyAction>,
  state$: StateObservable<RootState>,
) => action$.pipe(
  ofType(types.SIGN_UP_REQUEST),
  switchMap(({
    payload: {
      userName, displayName, email, password,
    },
  }) => from(services.signUpApi(userName, displayName, email, password)).pipe(
    map((response) => actions.signUpSuccess()),
    catchError((error) => of(actions.signUpFailure(error.message))),
  )),
);

// Combine epics
export const rootEpic = combineEpics(signInEpic, signUpEpic);
