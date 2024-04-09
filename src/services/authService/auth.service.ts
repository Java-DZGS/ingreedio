import axios, { AxiosResponse } from 'axios';
import { apiUrl } from '../../config/config';

const authApiUrl = `${apiUrl}/auth`;

export interface AuthResponse {
  accessToken: string,
  refreshToken: string,
}

export const signInApi = (userName: string, password: string):
  Promise<AxiosResponse<AuthResponse>> => axios.post(
  `${authApiUrl}/login`, { userName, password },
);

export const signUpApi = (
  userName: string,
  displayName: string,
  email: string,
  password: string,
):
  Promise<AxiosResponse<AuthResponse>> => axios.post(
  `${authApiUrl}/register`, {
    userName, displayName, email, password,
  },
);
