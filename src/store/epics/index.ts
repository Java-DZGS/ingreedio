import { combineEpics } from 'redux-observable';
import { authEpic } from './auth.epic';
import { likeEpic } from './like.epic';
import { userEpic } from './user.epic';

export const rootEpic = combineEpics(authEpic, likeEpic, userEpic);
