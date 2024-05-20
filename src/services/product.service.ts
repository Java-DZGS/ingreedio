import axios, { AxiosResponse } from 'axios';
import { apiUrl } from '../config/config';
import { IngredientObject } from './ingredients.service';

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

export interface ProductCriteria {
    ingredientsToInclude: IngredientObject[];
    ingredientsToExclude: IngredientObject[];
    phrase: string;
}

export const getProductsListApi = (
  params?: ProductCriteria,
): Promise<AxiosResponse<ProductResponse>> => {
    if (params === undefined) {
        return axios.get(`${productsApiUrl}`);
    }
};

export const getProductDetailsApi = (
  id: string,
): Promise<AxiosResponse<ProductDetailsResponse>> => axios.get(`${productsApiUrl}/${id}`);
