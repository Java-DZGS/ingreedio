import { AxiosResponse } from 'axios';
import api from '../config/api';

const getApiUrl = (productId: string): string => `/products/${productId}/ratings`;

export interface ReviewObject {
    rating: number,
    content: string
}

export interface ReviewResponse {
    userId: string,
    displayName: string,
    productId: string,
    rating: number,
    content: string,
    createdAt: string
}

export const getProductReviewsApi = async (
  id: string,
): Promise<AxiosResponse<ReviewResponse[]>> => api.get(getApiUrl(id));

export const postProductReviewApi = async (
  id: string,
  review: ReviewObject,
): Promise<AxiosResponse<ReviewResponse>> => api.post(getApiUrl(id), {
  rating: review.rating,
  content: review.content,
});

export const putProductReviewApi = async (
  id: string,
  review: ReviewObject,
): Promise<AxiosResponse<ReviewResponse>> => api.put(getApiUrl(id), {
  rating: review.rating,
  content: review.content,
});

export const deleteProductReviewApi = async (
  id: string,
): Promise<AxiosResponse<void>> => api.delete(getApiUrl(id));
