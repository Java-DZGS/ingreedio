import axios, { AxiosResponse } from 'axios';
import { apiUrl } from '../config/config';
import RequestUrlBuilder from '../utils/requestBuilder';
import api from '../config/api';
import { stringToUrlString } from '../utils/stringToUrlString';

const productsApiUrl = `${apiUrl}/products`;

enum ProductListRequestParam {
  PAGE_NUMBER = 'page-number',
  INGREDIENTS_EXCLUDE = 'ingredients-exclude',
  INGREDIENTS_INCLUDE = 'ingredients-include',
  MIN_RATING = 'min-rating',
  PHRASE = 'phrase',
  SORT_BY = 'sort-by',
  LIKED = 'liked'
}

export enum SortOption {
  MATCH_SCORE = 'match-score',
  OPINIONS_COUNT = 'opinions-count',
  RATES_COUNT = 'rates-count',
  RATING = 'rating',
}

export enum SortOrder {
  ASCENDING = 'a',
  DESCENDING = 'd'
}

export interface SortBy {
  option: SortOption,
  order: SortOrder
}

export interface ProductObject {
  id: string;
  name: string;
  brand: string;
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
    sortingCriteria?: SortBy[];
    // TODO: sort by, brands, providers, categories
}

const parseSortBy = (input: string): SortBy | undefined => {
  const parts = input.split('-');
  const order = parts[0];
  const option = parts.slice(1).join('-');
    console.log(order);
    console.log(option);
  if (
    (order === SortOrder.ASCENDING || order === SortOrder.DESCENDING)
    && Object.values(SortOption).includes(option as SortOption)
  ) {
    return {
      option: option as SortOption,
      order: order as SortOrder,
    };
  }
  return undefined;
};

export const urlToProductCriteria = (url: string): ProductCriteria => {
  const queryParams = new URLSearchParams(url);

  const sortingCriteriaParam = queryParams.get(ProductListRequestParam.SORT_BY);
  let sortingCriteria: SortBy[] = [];
  if (sortingCriteriaParam) {
    sortingCriteria = sortingCriteriaParam
      .split(',')
      .map(parseSortBy)
      .filter((sortBy): sortBy is SortBy => sortBy !== undefined);
  }

  const minRatingParam = queryParams.get(ProductListRequestParam.MIN_RATING);
  let minRating: number | undefined;
  if (minRatingParam) {
    const parsedRating = parseInt(minRatingParam, 10);
    if (!Number.isNaN(parsedRating)) {
      minRating = parsedRating;
    }
  }

  const criteria: ProductCriteria = {
    phrase: queryParams.get(ProductListRequestParam.PHRASE) ?? undefined,
    ingredientsToExcludeIds: queryParams.get(ProductListRequestParam.INGREDIENTS_EXCLUDE)?.split(',') ?? undefined,
    ingredientsToIncludeIds: queryParams.get(ProductListRequestParam.INGREDIENTS_INCLUDE)?.split(',') ?? undefined,
    minRating,
    sortingCriteria,
    // TODO: sort by, brands, providers, categories
  };

  return criteria;
};

export const productCriteriaToUrlBuilder = (
  baseUrl: string,
  criteria: ProductCriteria,
): RequestUrlBuilder => {
  const builder = new RequestUrlBuilder(baseUrl);
  console.log(criteria);

  if (criteria.phrase) {
    // The phrase has the uneccessary spaces removed
    // and the rest of the spaces are replaced with '%20'
    builder.setParam(ProductListRequestParam.PHRASE, stringToUrlString(criteria.phrase));
  }

  if (criteria.ingredientsToIncludeIds && criteria.ingredientsToIncludeIds.length > 0) {
    builder.setParam(ProductListRequestParam.INGREDIENTS_INCLUDE,
      criteria.ingredientsToIncludeIds.join(','));
  }

  if (criteria.ingredientsToExcludeIds && criteria.ingredientsToExcludeIds.length > 0) {
    builder.setParam(ProductListRequestParam.INGREDIENTS_EXCLUDE,
      criteria.ingredientsToExcludeIds.join(','));
  }

  if (criteria.minRating) {
    builder.setParam(ProductListRequestParam.MIN_RATING, criteria.minRating.toString());
  }

  if (criteria.sortingCriteria && criteria.sortingCriteria.length > 0) {
    builder.setParam(ProductListRequestParam.SORT_BY, criteria.sortingCriteria.map(
      (sortBy: SortBy) => `${sortBy.order}-${sortBy.option}`,
    ).join(','));
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
    builder.setParam(ProductListRequestParam.PAGE_NUMBER, (pageNumber ?? 0).toString());
    return axios.get(builder.build());
  }

  const builder = productCriteriaToUrlBuilder(productsApiUrl, criteria);
  builder.setParam(ProductListRequestParam.PAGE_NUMBER, (pageNumber ?? 0).toString());

  return axios.get(builder.build());
};

export const getProductDetailsApi = (
  id: string,
): Promise<AxiosResponse<ProductDetailsResponse>> => axios.get(`${productsApiUrl}/${id}`);

export const getLikedProductsApi = (
  pageNumber?: number,
): Promise<AxiosResponse<ProductResponse>> => {
  const builder = new RequestUrlBuilder(productsApiUrl);
  builder.setParam(ProductListRequestParam.PAGE_NUMBER, (pageNumber ?? 0).toString());
  builder.setParam(ProductListRequestParam.LIKED, 'true');
  return api.get(builder.build());
};
