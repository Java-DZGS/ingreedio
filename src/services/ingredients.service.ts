import axios, { AxiosResponse } from 'axios';
import { apiUrl } from '../config/config';
import { WithId } from '../types/types';
import RequestUrlBuilder from '../utils/requestBuilder';

const ingredientsApiUrl = `${apiUrl}/ingredients`;

export interface IngredientObject extends WithId {
  name: string;
}

export const getIngredientsApi = (query: string, count: number): Promise<
  AxiosResponse<IngredientObject[]>
> => axios.get(new RequestUrlBuilder(`${ingredientsApiUrl}`).setParam('count', count.toString()).setParam('query', query).build());

// Example of the ids string: '5,21,52,10,11'
export const getIngredientsByIdsStringApi = (ids: string): Promise<
  AxiosResponse<IngredientObject[]>
> => axios.get(new RequestUrlBuilder(`${ingredientsApiUrl}/get-by`).setParam('ids', ids).build());

export const getIngredientsByIdsApi = (ids: string[]): Promise<
  AxiosResponse<IngredientObject[]>
> => getIngredientsByIdsStringApi(ids.join(','));
