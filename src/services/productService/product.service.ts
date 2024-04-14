import axios, { AxiosResponse } from 'axios';
import { apiUrl } from '../../config/config';

const productsApiUrl = `${apiUrl}/products`;

export interface ProductResponse {
    id: number,
    name: string,
    smallImageUrl: string,
    provider: string,
    shortDescription: string,
}

export interface ProductDetailsResponse {
  id: number,
  name: string,
  largeImageUrl: string,
  provider: string,
  brand: string,
  longDescription: string,
  volume: number,
  ingredients: string[],
}

export const getProductsListApi = (
  accessToken: string,
): Promise<AxiosResponse<ProductResponse[]>> => axios.get(`${productsApiUrl}`, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export const getProductDetailsApi = (
  accessToken: string,
  id: number,
): Promise<AxiosResponse<ProductDetailsResponse>> => axios.get(`${productsApiUrl}/${id}`, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
