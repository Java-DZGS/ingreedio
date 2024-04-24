import axios, { AxiosResponse } from 'axios';
import { apiUrl } from '../../config/config';

const productsApiUrl = `${apiUrl}/products`;

export interface ProductResponse {
  id: number;
  name: string;
  smallImageUrl: string;
  provider: string;
  shortDescription: string;
}

export interface ProductDetailsResponse {
  id: number;
  name: string;
  largeImageUrl: string;
  provider: string;
  brand: string;
  longDescription: string;
  volume: number;
  ingredients: string[];
}

export interface ProductFilters {
  name: string;
  provider: string;
  brand: string;
  volumeFrom: number;
  volumeTo: number;
}

export const getProductsListApi = (): Promise<
  AxiosResponse<ProductResponse[]>
> => axios.get(`${productsApiUrl}`);

export const getFilteredProductsListApi = (
  params: ProductFilters,
): Promise<AxiosResponse<ProductResponse[]>> => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== ''),
  );

  const queryParams = new URLSearchParams(
    filteredParams as Record<string, string>,
  ).toString();

  const url = `${productsApiUrl}${queryParams ? `?${queryParams}` : ''}`;

  return axios.get(url);
};

export const getProductDetailsApi = (
  id: number,
): Promise<AxiosResponse<ProductDetailsResponse>> => axios.get(`${productsApiUrl}/${id}`);
