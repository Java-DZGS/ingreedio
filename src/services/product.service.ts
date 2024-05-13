import axios, { AxiosResponse } from 'axios';
import { apiUrl } from '../config/config';

const productsApiUrl = `${apiUrl}/products`;

export interface ProductObject {
  id: string;
  name: string;
  smallImageUrl: string;
  provider: string;
  shortDescription: string;
  isLiked?: boolean;
}

export interface ProductResponse {
  products: ProductObject[];
  totalPages: number;
}

export interface ProductDetailsResponse {
  id: string;
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
}

export const getProductsListApi = (): Promise<
  AxiosResponse<ProductResponse>
> => axios.get(`${productsApiUrl}`);

export const getFilteredProductsListApi = (
  params: ProductFilters,
): Promise<AxiosResponse<ProductResponse>> => {
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
  id: string,
): Promise<AxiosResponse<ProductDetailsResponse>> => axios.get(`${productsApiUrl}/${id}`);
