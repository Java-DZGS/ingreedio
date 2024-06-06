import { AxiosResponse } from 'axios';
import api from '../config/api';

const getApiUrl = (reviewId: string): string => `/reviews/${reviewId}`;
const getLikeApiUrl = (reviewId: string): string => `/reviews/${reviewId}/likes`;
const getDislikeApiUrl = (reviewId: string): string => `/reviews/${reviewId}/dislikes`;
const getReportApiUrl = (reviewId: string): string => `/reviews/${reviewId}/reports`;

export interface ReviewObject {
    rating: number,
    content: string
}

export interface ReviewResponse {
    reviewId: string,
    userId: string,
    displayName: string,
    productId: string,
    rating: number,
    content: string,
    createdAt: string,
    isLiked: boolean | null,
    isDisliked: boolean | null,
    isCurrentUser: boolean | null,
    likesCount: number,
    dislikesCount: number,
}

export interface ReportResponse {
  reportId: string,
  userId: string,
  reviewId: string,
  content: string,
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

export const likeReviewApi = async (
  id: string,
): Promise<AxiosResponse<void>> => api.post(getLikeApiUrl(id));

export const unlikeReviewApi = async (
  id: string,
): Promise<AxiosResponse<void>> => api.delete(getLikeApiUrl(id));

export const dislikeReviewApi = async (
  id: string,
): Promise<AxiosResponse<void>> => api.post(getDislikeApiUrl(id));

export const undislikeReviewApi = async (
  id: string,
): Promise<AxiosResponse<void>> => api.delete(getDislikeApiUrl(id));

export const reportReviewApi = async (
  id: string,
  content: string,
): Promise<AxiosResponse<ReportResponse>> => api.post(getReportApiUrl(id), content);
