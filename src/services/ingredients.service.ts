import axios, { AxiosResponse } from 'axios';
import { apiUrl } from '../config/config';

const ingredientsApiUrl = `${apiUrl}/ingredients`;

export interface IngredientObject {
  id: string;
  name: string;
}

export const getIngredientsApi = (query: string, count: number): Promise<
  AxiosResponse<IngredientObject[]>
> => axios.get(`${ingredientsApiUrl}?count=${count}&query=${query}`);
