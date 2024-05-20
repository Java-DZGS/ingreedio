import axios, { AxiosResponse } from 'axios';
import { apiUrl } from '../config/config';
import { WithId } from '../types/types';

const ingredientsApiUrl = `${apiUrl}/ingredients`;

export interface IngredientObject extends WithId {
  name: string;
}

export const getIngredientsApi = (query: string, count: number): Promise<
  AxiosResponse<IngredientObject[]>
> => axios.get(`${ingredientsApiUrl}?count=${count}&query=${query}`);
