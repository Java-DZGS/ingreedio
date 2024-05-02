import { combineEpics } from 'redux-observable';
import { authEpic } from './auth.epic';
import { likeEpic } from './like.epic';

export const rootEpic = combineEpics(authEpic, likeEpic);
