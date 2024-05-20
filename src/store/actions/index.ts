import authActions, { types as authTypes } from './auth.action';
import likeActions, { types as likeTypes } from './like.action';
import userActions, { types as userTypes } from './user.action';

export const types = {
  ...authTypes,
  ...likeTypes,
  ...userTypes,
};

export default {
  ...authActions,
  ...likeActions,
  ...userActions,
};
