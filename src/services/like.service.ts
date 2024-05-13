import { AxiosResponse } from 'axios';
import api from '../config/api';
import { apiUrl } from '../config/config';

const getApiUrl = (productId: string): string => `/products/${productId}/likes`;

export const likeProductApi = async (
  productId: string,
): Promise<AxiosResponse<void>> => api.post(getApiUrl(productId));

export const unlikeProductApi = async (
  productId: string,
): Promise<AxiosResponse<void>> => api.delete(getApiUrl(productId));
