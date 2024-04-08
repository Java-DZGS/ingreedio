import axios from 'axios';
import { apiUrl } from '../../config/config';

const authApiUrl = `${apiUrl}/auth`;

export const signInApi = (userName, password) => axios.post(
  `${authApiUrl}/login`, { userName, password },
);

export const signUpApi = (userName, displayName, email, password) => axios.post(
  `${authApiUrl}/register`, {
    userName, displayName, email, password,
  },
);
