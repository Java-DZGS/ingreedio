import { AnyAction } from 'redux';
import { AxiosError } from 'axios';
import { AuthResponse } from '../../services/authService/auth.service';
import { ProductResponse } from '../../services/productService/product.service';

export const types = {
  SIGN_IN_REQUEST: 'SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE: 'SIGN_IN_FAILURE',
  SIGN_UP_REQUEST: 'SIGN_UP_REQUEST',
  SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
  SIGN_UP_FAILURE: 'SIGN_UP_FAILURE',
  SIGN_OUT: 'SIGN_OUT',
  END_AUTH_ACTION: 'END_AUTH_ACTION',
  FETCH_PRODUCTS_LIST: 'GET_PRODUCTS_LIST',
  FETCH_PRODUCTS_LIST_SUCCESS: 'FETCH_PRODUCTS_LIST_SUCCESS',
  FETCH_PRODUCTS_LIST_FAILURE: 'FETCH_PRODUCTS_LIST_FAILURE',
  FETCH_PRODUCT_DETAILS: 'GET_PRODUCT_DETAILS',
  FETCH_PRODUCT_DETAILS_FAILURE: 'FETCH_PRODUCT_DETAILS_FAILURE',
  FETCH_PRODUCT_DETAILS_SUCCESS: 'FETCH_PRODUCT_DETAILS_SUCCESS',
};

const signInRequest = (username: string, password: string): AnyAction => ({
  type: types.SIGN_IN_REQUEST,
  payload: { username, password },
});

const signInSuccess = (response: AuthResponse): AnyAction => ({
  type: types.SIGN_IN_SUCCESS,
  payload: response,
});

// todo: error type
const signInFailure = (error: AxiosError): AnyAction => ({
  type: types.SIGN_IN_FAILURE,
  payload: error,
});

const signUpRequest = (
  username: string,
  displayName: string,
  email: string,
  password: string,
): AnyAction => ({
  type: types.SIGN_UP_REQUEST,
  payload: {
    username,
    displayName,
    email,
    password,
  },
});

const signUpSuccess = (): AnyAction => ({
  type: types.SIGN_UP_SUCCESS,
});

const signUpFailure = (error: AxiosError): AnyAction => ({
  type: types.SIGN_UP_FAILURE,
  payload: error,
});

const signOut = (): AnyAction => ({
  type: types.SIGN_OUT,
});

const endAuthAction = (): AnyAction => ({
  type: types.END_AUTH_ACTION,
});

const fetchProductsList = (accessToken: string): AnyAction => ({
  type: types.FETCH_PRODUCTS_LIST,
  payload: accessToken,
});

const fetchProductsListSuccess = (products: ProductResponse[]): AnyAction => ({
  type: types.FETCH_PRODUCTS_LIST_SUCCESS,
  payload: products,
});

const fetchProductsListFailure = (error: string): AnyAction => ({
  type: types.FETCH_PRODUCTS_LIST_FAILURE,
  payload: error,
});

const fetchProductDetails = (accessToken: string, id: number): AnyAction => ({
  type: types.FETCH_PRODUCT_DETAILS,
  payload: { accessToken, id },
});

const fetchProductDetailsSuccess = (product: ProductResponse): AnyAction => ({
  type: types.FETCH_PRODUCT_DETAILS_SUCCESS,
  payload: product,
});

const fetchProductDetailsFailure = (error: string): AnyAction => ({
  type: types.FETCH_PRODUCT_DETAILS_FAILURE,
  payload: error,
});

export default {
  signInRequest,
  signInSuccess,
  signInFailure,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  signOut,
  endAuthAction,
  fetchProductsList,
  fetchProductsListFailure,
  fetchProductsListSuccess,
  fetchProductDetails,
  fetchProductDetailsFailure,
  fetchProductDetailsSuccess,
};
