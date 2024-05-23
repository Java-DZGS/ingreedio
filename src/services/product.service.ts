import axios, { AxiosResponse } from 'axios';
import { apiUrl } from '../config/config';
import RequestUrlBuilder from '../utils/requestBuilder';
import api from '../config/api';

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
  rating: number
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
  rating: number
}

export interface ProductCriteria {
    phrase?: string;
    ingredientsToIncludeIds?: string[];
    ingredientsToExcludeIds?: string[];
    minRating?: number;
    // TODO: sort by, brands, providers, categories
}

export const urlToProductCriteria = (url: string): ProductCriteria => {
  const queryParams = new URLSearchParams(url);
  const minRatingStr = queryParams.get(ProductListRequestParams.MIN_RATING);
  let minRating: number | undefined = minRatingStr !== null
    ? parseInt(minRatingStr, 10) : undefined;

  if (Number.isNaN(minRating as number)) {
    minRating = undefined;
  }

  const criteria: ProductCriteria = {
    phrase: queryParams.get(ProductListRequestParams.PHRASE) ?? undefined,
    ingredientsToExcludeIds: queryParams.get(ProductListRequestParams.INGREDIENTS_EXCLUDE)?.split(',') ?? undefined,
    ingredientsToIncludeIds: queryParams.get(ProductListRequestParams.INGREDIENTS_INCLUDE)?.split(',') ?? undefined,
    minRating,
    // TODO: sort by, brands, providers, categories
  };

  return criteria;
};

export const productCriteriaToUrlBuilder = (
  baseUrl: string,
  criteria: ProductCriteria,
): RequestUrlBuilder => {
  const builder = new RequestUrlBuilder(baseUrl);

  if (criteria.phrase) {
    builder.setParam(ProductListRequestParams.PHRASE, criteria.phrase.toString());
  }

  if (criteria.ingredientsToIncludeIds) {
    builder.setParam(ProductListRequestParams.INGREDIENTS_INCLUDE,
      criteria.ingredientsToIncludeIds.join(','));
  }

  if (criteria.ingredientsToExcludeIds) {
    builder.setParam(ProductListRequestParams.INGREDIENTS_EXCLUDE,
      criteria.ingredientsToExcludeIds.join(','));
  }

  if (criteria.minRating) {
    builder.setParam(ProductListRequestParams.MIN_RATING, criteria.minRating.toString());
  }

  // TODO: sort by, brands, providers, categories

  return builder;
};

export const productCriteriaToUrl = (
  baseUrl: string,
  criteria: ProductCriteria,
): string => productCriteriaToUrlBuilder(baseUrl, criteria).build();

export const getProductsListApi = (
  criteria?: ProductCriteria,
  pageNumber?: number,
): Promise<AxiosResponse<ProductResponse>> => {
  if (criteria === undefined) {
    const builder = new RequestUrlBuilder(productsApiUrl);
    builder.setParam(ProductListRequestParams.PAGE_NUMBER, (pageNumber ?? 0).toString());
    return axios.get(builder.build());
  }

  const builder = productCriteriaToUrlBuilder(productsApiUrl, criteria);
  builder.setParam(ProductListRequestParams.PAGE_NUMBER, (pageNumber ?? 0).toString());

  return axios.get(builder.build());
};

export const getProductDetailsApi = (
  id: string,
): Promise<AxiosResponse<ProductDetailsResponse>> => axios.get(`${productsApiUrl}/${id}`);

export const getLikedProductsApi = (
  pageNumber?: number,
): Promise<AxiosResponse<ProductResponse>> => {
  const builder = new RequestUrlBuilder(productsApiUrl);
  builder.setParam(ProductListRequestParams.PAGE_NUMBER, (pageNumber ?? 0).toString());
  builder.setParam(ProductListRequestParams.LIKED, 'true');
  return api.get(builder.build());
};
