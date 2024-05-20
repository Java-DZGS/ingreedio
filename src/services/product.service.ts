import axios, { AxiosResponse } from 'axios';
import { apiUrl } from '../config/config';
import { IngredientObject } from './ingredients.service';
import toIdSetString from '../utils/toIdSetString';
import RequestWithParamsBuilder from '../utils/reqeustWithParamsBuilder';

const productsApiUrl = `${apiUrl}/products`;

enum ProductListRequestParams {
    PAGE_NUMBER = 'page-number',
    INGREDIENTS_EXCLUDE = 'ingredients-exclude',
    INGREDIENTS_INCLUDE = 'ingredients-include',
    MIN_RATING = 'min-rating',
    PHRASE = 'phrase',
    SORT_BY = 'sort-by',
    LIKED = 'liked'
}

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
    ingredientsToInclude?: IngredientObject[];
    ingredientsToExclude?: IngredientObject[];
    minRating?: number;
    phrase?: string;
    liked?: boolean;
}

export const getProductsListApi = (
  params?: ProductCriteria,
  pageNumber?: number,
): Promise<AxiosResponse<ProductResponse>> => {
  const builder = new RequestWithParamsBuilder(productsApiUrl);
  builder.setParam(ProductListRequestParams.PAGE_NUMBER, (pageNumber ?? 0).toString());

  if (params === undefined) {
    return axios.get(builder.build());
  }

  if (params.ingredientsToInclude) {
    builder.setParam(ProductListRequestParams.INGREDIENTS_INCLUDE,
      toIdSetString(params.ingredientsToInclude));
  }

  if (params.ingredientsToExclude) {
    builder.setParam(ProductListRequestParams.INGREDIENTS_EXCLUDE,
      toIdSetString(params.ingredientsToExclude));
  }

  if (params.minRating) {
    builder.setParam(ProductListRequestParams.MIN_RATING, params.minRating.toString());
  }

  if (params.phrase) {
    builder.setParam(ProductListRequestParams.PHRASE, params.phrase.toString());
  }

  if (params.liked) {
    builder.setParam(ProductListRequestParams.LIKED, params.liked.toString());
  }

  // TODO: SORT_BY

  return axios.get(builder.build());
};

export const getProductDetailsApi = (
  id: string,
): Promise<AxiosResponse<ProductDetailsResponse>> => axios.get(`${productsApiUrl}/${id}`);
