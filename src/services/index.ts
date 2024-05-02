import { signInApi, signUpApi } from './auth.service';
import {
  getFilteredProductsListApi,
  getProductDetailsApi,
  getProductsListApi,
} from './product.service';

export default {
  signInApi,
  signUpApi,
  getProductsListApi,
  getProductDetailsApi,
  getFilteredProductsListApi,
};
