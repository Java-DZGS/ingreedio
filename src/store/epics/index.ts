import { StateObservable, combineEpics, ofType } from 'redux-observable';
import { switchMap, catchError, map } from 'rxjs/operators';
import { from, of, Observable } from 'rxjs';
import { AnyAction } from 'redux';
import actions, { types } from '../actions';
import services from '../../services';
import { RootState } from '../reducers';
import { ProductResponse } from '../../services/productService/product.service';

const signInEpic = (
  action$: Observable<AnyAction>,
  state$: StateObservable<RootState>,
) =>
  action$.pipe(
    ofType(types.SIGN_IN_REQUEST),
    switchMap(({ payload }) =>
      from(services.signInApi(payload.username, payload.password)).pipe(
        map((response) => actions.signInSuccess(response.data)),
        catchError((error) => of(actions.signInFailure(error.message))),
      ),
    ),
  );

const signUpEpic = (
  action$: Observable<AnyAction>,
  state$: StateObservable<RootState>,
) =>
  action$.pipe(
    ofType(types.SIGN_UP_REQUEST),
    switchMap(({ payload: { username, displayName, email, password } }) =>
      from(services.signUpApi(username, displayName, email, password)).pipe(
        map((response) => actions.signUpSuccess()),
        catchError((error) => of(actions.signUpFailure(error.message))),
      ),
    ),
  );

const fetchProductsListEpic = (
  action$: Observable<AnyAction>,
  state$: StateObservable<RootState>,
) =>
  action$.pipe(
    ofType(types.FETCH_PRODUCTS_LIST),
    switchMap(({ payload: accessToken }) =>
      from(services.getProductsListApi(accessToken)).pipe(
        map((response: any) => actions.fetchProductsListSuccess(response)),
        catchError((error) =>
          of(actions.fetchProductsListFailure(error.message)),
        ),
      ),
    ),
  );

  const fetchProductDetailsEpic = (
    action$: Observable<AnyAction>,
    state$: StateObservable<RootState>,
  ) =>
    action$.pipe(
      ofType(types.FETCH_PRODUCT_DETAILS),
      switchMap(({ payload: {accessToken, id} }) =>
        from(services.getProductDetailsApi(accessToken, id)).pipe(
          map((response: any) => actions.fetchProductDetailsSuccess(response)),
          catchError((error) =>
            of(actions.fetchProductDetailsFailure(error.message)),
          ),
        ),
      ),
    );

// Combine epics
export const rootEpic = combineEpics(
  signInEpic,
  signUpEpic,
  fetchProductsListEpic,
  fetchProductDetailsEpic
);
