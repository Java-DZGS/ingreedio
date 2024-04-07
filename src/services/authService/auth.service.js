import axios from 'axios';
import { apiUrl } from '../../config/config';

export const signInApi = (userName, password) => axios.post(`${apiUrl}/auth/login`, { userName, password });

export const signUpApi = (userName, displayName, email, password) => axios.post(`${apiUrl}/auth/register`, {
  userName, displayName, email, password,
});
