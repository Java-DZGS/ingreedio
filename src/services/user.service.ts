import { AxiosResponse } from 'axios';
import api from '../config/api';

export interface UserInfoResponse {
  id: number;
  email: string;
  displayName: string;
  likedIngredients: Array<{ id: number; name: string }>;
  allergens: Array<{ id: number; name: string }>;
  likedProducts: number[];
  reviews: Array<{
    id: number;
    user: string;
    productId: number;
    rating: number;
    content: string;
    createdAt: string;
  }>;
}

export const getUserInfoApi = async (
  username: string,
): Promise<AxiosResponse<UserInfoResponse>> => api.get('/users', {
  params: { username },
});
