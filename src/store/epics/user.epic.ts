import { Epic, combineEpics, ofType } from 'redux-observable';
import { AnyAction } from 'redux';
import {
  catchError, from, map, of, switchMap,
} from 'rxjs';
import { AxiosResponse } from 'axios';
import { RootState } from '../reducers';
import actions, { types } from '../actions';
import { UserInfoResponse, getUserInfoApi } from '../../services/user.service';

const userInfoEpic: Epic<AnyAction, AnyAction, RootState> = (action$, _state$) => action$.pipe(
  ofType(types.GET_USER_INFO_REQUEST),
  switchMap(({ payload }) => from(getUserInfoApi(payload.username)).pipe(
    map((response: AxiosResponse<UserInfoResponse>) => actions.getUserInfoSuccess(response.data)),
    catchError((error) => of(actions.getUserInfoFailure(error.message))),
  )),
);

const logUserEpic: Epic<AnyAction, AnyAction, RootState> = (action$, _state$) => action$.pipe(
  ofType(types.LOG_USER),
  switchMap(({ payload }) => from(getUserInfoApi(payload.username)).pipe(
    map((response: AxiosResponse<UserInfoResponse>) => actions.getUserInfoSuccess(response.data)),
    catchError((error) => of(actions.getUserInfoFailure(error.message))),
  )),
);

export const userEpic = combineEpics(userInfoEpic, logUserEpic);
