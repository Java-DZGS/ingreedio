import axios from 'axios';
import { apiUrl } from '../../config/config';

export const signInApi = (userName, password) => {
  console.log(`sign in ${userName} ${password}`);
  return axios.post(`${apiUrl}/auth/login`, { userName, password });
};

export const signUpApi = (userName, displayName, email, password) => {
  console.log(`chuj ${displayName} ${userName} ${email} ${password}`);
  return axios.post(`${apiUrl}/auth/register`, {
    userName, displayName, email, password,
  });
};
