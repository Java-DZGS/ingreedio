import { AxiosResponse } from 'axios';
import { apiUrl } from '../config/config';
import RequestUrlBuilder from '../utils/requestBuilder';
import { ObjectWithNameAndId } from '../types/objectWithNameAndId';
import api from '../config/api';

const categoriesApiUrl = `${apiUrl}/categories`;

export type CategoryObject = ObjectWithNameAndId

export const getCategoriesApi = (query: string, count: number): Promise<
  AxiosResponse<CategoryObject[]>
> => api.get(new RequestUrlBuilder(`${categoriesApiUrl}`).setParam('count', count.toString()).setParam('query', query)
  .build());

// Example of the ids string: '5,21,52,10,11'
export const getCategoriesByIdsStringApi = (ids: string): Promise<
  AxiosResponse<CategoryObject[]>
> => api.get(new RequestUrlBuilder(`${categoriesApiUrl}/get-by`).setParam('ids', ids).build());

export const getCategoriesByIdsApi = (ids: string[]): Promise<
  AxiosResponse<CategoryObject[]>
> => getCategoriesByIdsStringApi(ids.join(','));
