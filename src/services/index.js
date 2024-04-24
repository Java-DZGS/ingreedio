import { signInApi, signUpApi } from './authService/auth.service';
import { getFilteredProductsListApi, getProductDetailsApi, getProductsListApi } from './productService/product.service';

export default {
  signInApi,
  signUpApi,
  getProductsListApi,
  getProductDetailsApi,
  getFilteredProductsListApi,
};
