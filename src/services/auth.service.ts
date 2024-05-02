import axios, { AxiosResponse } from 'axios';
import { apiUrl } from '../config/config';

const authApiUrl = `${apiUrl}/auth`;

export interface AuthResponse {
  accessToken: string,
  refreshToken: string,
}

export const signInApi = (username: string, password: string):
  Promise<AxiosResponse<AuthResponse>> => axios.post(
  `${authApiUrl}/login`, { username, password },
);

export const signUpApi = (
  username: string,
  displayName: string,
  email: string,
  password: string,
):
  Promise<AxiosResponse<AuthResponse>> => axios.post(
  `${apiUrl}/users`, {
    username, displayName, email, password,
  },
);
