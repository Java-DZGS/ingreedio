import { AxiosResponse } from 'axios';
import { apiUrl } from '../config/config';
import RequestUrlBuilder from '../utils/requestBuilder';
import { ObjectWithNameAndId } from '../types/objectWithNameAndId';
import api from '../config/api';

const ingredientsApiUrl = `${apiUrl}/ingredients`;

export type IngredientObject = ObjectWithNameAndId

export const getIngredientsApi = (query: string, count: number, skipAllergens?: boolean): Promise<
  AxiosResponse<IngredientObject[]>
> => axios.get(new RequestUrlBuilder(`${ingredientsApiUrl}`).setParam('skip-allergens', skipAllergens?.toString() ?? 'false').setParam('count', count.toString()).setParam('query', query)
  .build());

// Example of the ids string: '5,21,52,10,11'
export const getIngredientsByIdsStringApi = (ids: string): Promise<
  AxiosResponse<IngredientObject[]>
> => api.get(new RequestUrlBuilder(`${ingredientsApiUrl}/get-by`).setParam('ids', ids).build());

export const getIngredientsByIdsApi = (ids: string[]): Promise<
  AxiosResponse<IngredientObject[]>
> => getIngredientsByIdsStringApi(ids.join(','));
